import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import Footer from "./footer";
import { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } from "../constants/todo-filters";

const setup = (propOverrides) => {
    const props = Object.assign(
        {
            completedCount: 0,
            activeCount: 0,
            totalCount: 0,
            filter: SHOW_ALL,
            onClearCompleted: jest.fn(),
        },
        propOverrides
    );

    const { rerender } = render(<Footer {...props} />);

    return {
        props,
        rerender,
    };
};

describe("components", () => {
    afterEach(cleanup);

    describe("Footer", () => {
        it("should render container", async () => {
            setup();
            const footer = await screen.queryByTestId("footer");
            expect(footer).toBeInTheDocument();
        });

        it("should display active count when 0", async () => {
            setup({ activeCount: 0 });
            const text = await screen.queryByText(/0 items left/i);
            expect(text).toBeInTheDocument();
        });

        it("should display active count when above 0", async () => {
            setup({ activeCount: 1, filter: SHOW_ACTIVE });
            const text = await screen.queryByText(/1 item left/i);
            expect(text).toBeInTheDocument();
        });

        it("should render filters", async () => {
            setup();
            const footer = await screen.queryByTestId("footer-navigation");
            expect(footer).toBeInTheDocument();
            const allLink = await screen.queryByText(/All/i);
            expect(allLink).toBeInTheDocument();
            const activeLink = await screen.queryByText(/Active/i);
            expect(activeLink).toBeInTheDocument();
            const completedLink = await screen.queryByText(/Completed/i);
            expect(completedLink).toBeInTheDocument();
        });

        it("shouldn't show clear button when no completed todos", async () => {
            setup({ completedCount: 0 });
            const clearButton = await screen.queryByTestId("clear-completed");
            expect(clearButton).not.toBeInTheDocument();
        });

        it("should render clear button when completed todos", async () => {
            setup({ completedCount: 1 });
            const clearButton = await screen.queryByTestId("clear-completed");
            expect(clearButton).toBeInTheDocument();
        });

        it("should call onClearCompleted on clear button click", async () => {
            const { props } = setup({ completedCount: 1 });
            const clearButton = await screen.queryByTestId("clear-completed");
            expect(clearButton).toBeInTheDocument();
            fireEvent.click(clearButton);
            expect(props.onClearCompleted).toBeCalled();
        });

        it("should show the correct count based on filter", async () => {
            const { rerender } = setup({
                activeCount: 1,
                completedCount: 1,
                totalCount: 2,
                filter: SHOW_ALL,
            });
            let text = await screen.queryByText(/2 items left/i);
            expect(text).toBeInTheDocument();

            cleanup();
            rerender(<Footer {...setup({ activeCount: 1, completedCount: 1, totalCount: 2, filter: SHOW_ACTIVE }).props} />);
            let texts = await screen.queryAllByText(/1 item left/i);
            expect(texts.length).toBe(1);
            expect(texts[0]).toBeInTheDocument();

            cleanup();
            rerender(<Footer {...setup({ activeCount: 1, completedCount: 1, totalCount: 2, filter: SHOW_COMPLETED }).props} />);
            texts = await screen.queryAllByText(/1 item left/i);
            expect(texts.length).toBe(1);
            expect(texts[0]).toBeInTheDocument();
        });
    });
});
