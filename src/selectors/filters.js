import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from "../constants/todo-filters";

function getFilteredTodos(todos, filter) {
    switch (filter) {
        case SHOW_ALL:
            return todos;
        case SHOW_ACTIVE:
            return todos.filter(todo => !todo.completed);
        case SHOW_COMPLETED:
            return todos.filter(todo => todo.completed);
        default:
            return todos;
    }
}

export function getVisibleTodos(todos, route) {
    return getFilteredTodos(todos, route);
}

export function getCompletedTodos(todos) {
    return todos.filter(todo => todo.completed).length;
}
