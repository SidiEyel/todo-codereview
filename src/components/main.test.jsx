import { render, screen, fireEvent } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Main from "./main";
import { getCompletedTodos } from "../selectors/filters";
import { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } from "../constants/todo-filters";

const WrappedComponent = withRouter(Main);

const setup = (propOverrides) => {
    const todos = (propOverrides && propOverrides.todos) || [
        {
            text: "Use Redux",
            completed: false,
            id: 0,
        },
        {
            text: "Run the tests",
            completed: true,
            id: 1,
        },
    ];

    const visibleTodos = [...todos];
    const completedCount = getCompletedTodos(todos);
    const activeCount = todos.length - completedCount;
    const totalCount = todos.length;

    const props = Object.assign(
        {
            todos: [...todos],
            editTodo: jest.fn(),
            deleteTodo: jest.fn(),
            toggleTodo: jest.fn(),
            toggleAll: jest.fn(),
            clearCompleted: jest.fn(),
            completedCount,
            activeCount,
            visibleTodos,
            totalCount,
            filter: SHOW_ALL,
        },
        propOverrides
    );

    const { rerender } = render(
        <HashRouter>
            <WrappedComponent {...props} />
        </HashRouter>
    );

    return {
        props,
        rerender,
    };
};

describe("components", () => {
    describe("Main", () => {
        it("should render container", async () => {
            setup();
            const main = await screen.queryByTestId("main");
            expect(main).toBeInTheDocument();
        });

        describe("toggle all input", () => {
            it("should render", async () => {
                setup();
                const toggle = await screen.queryByTestId("toggle-all");
                expect(toggle).toBeInTheDocument();
                expect(toggle.checked).toBeFalsy();
            });

            it("should be checked if all todos completed", async () => {
                setup({
                    todos: [
                        {
                            text: "Use Redux",
                            completed: true,
                            id: 0,
                        },
                    ],
                    completedCount: 1, 
                    totalCount: 1,      
                });
                const toggle = await screen.queryByTestId("toggle-all");
                expect(toggle).toBeInTheDocument();
                expect(toggle.checked).toBeTruthy();
            });

            it("should call toggleAll on change", async () => {
                const { props } = setup();
                const toggle = await screen.queryByTestId("toggle-all");
                fireEvent.click(toggle);
                expect(props.toggleAll).toBeCalled();
            });
        });

        describe("footer", () => {
            it("should render", async () => {
                const { props } = setup({
                    todos: [
                        {
                            text: "Use Redux",
                            completed: false,
                            id: 0,
                        },
                        {
                            text: "Run the tests",
                            completed: true,
                            id: 1,
                        },
                    ],
                    completedCount: 1,
                    activeCount: 1,
                    totalCount: 2,
                    filter: SHOW_ALL,
                });
                const footer = await screen.queryByTestId("footer");
                expect(footer).toBeInTheDocument();

                const text = await screen.queryByText(/2 items left/i);
                expect(text).toBeInTheDocument();

                const clearButton = await screen.queryByText(/Clear completed/i);
                expect(clearButton).toBeInTheDocument();
            });

            it("onClearCompleted should call clearCompleted", async () => {
                const { props } = setup({
                    todos: [
                        {
                            text: "Use Redux",
                            completed: false,
                            id: 0,
                        },
                        {
                            text: "Run the tests",
                            completed: true,
                            id: 1,
                        },
                    ],
                    completedCount: 1,
                    activeCount: 1,
                    totalCount: 2,
                    filter: SHOW_ALL,
                });
                const clearButton = await screen.queryByText(/Clear completed/i);
                expect(clearButton).toBeInTheDocument();
                fireEvent.click(clearButton);
                expect(props.clearCompleted).toBeCalled();
            });
        });

        describe("todo list", () => {
            it("should render", async () => {
                setup();
                const list = await screen.queryByTestId(/todo-list/i);
                expect(list).toBeInTheDocument();
                const items = await screen.getAllByTestId("todo-item");
                expect(items.length).toEqual(2);
            });
        });
    });
});
