import { connect } from "react-redux";
import Main from "../components/main";
import { editTodo, toggleTodo, toggleAll, deleteTodo, clearCompleted } from "../actions";
import { withRouter } from "react-router-dom";
import { getCompletedTodos, getVisibleTodos } from "../selectors/filters";

const mapStateToProps = (state, ownProps) => {
    const { todos } = state;
    const { location } = ownProps;

    const visibleTodos = getVisibleTodos(todos, location.pathname);
    const completedCount = getCompletedTodos(todos);
    const activeCount = todos.length - completedCount;
    const totalCount = todos.length;

    return { todos, completedCount, activeCount, totalCount, visibleTodos, filter: location.pathname };
};

const mapDispatchToProps = {
    editTodo,
    toggleTodo,
    toggleAll,
    deleteTodo,
    clearCompleted
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
