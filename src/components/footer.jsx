import { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from "../constants/todo-filters";

export default class Footer extends Component {
    static propTypes = {
        totalCount: PropTypes.number.isRequired,
        completedCount: PropTypes.number.isRequired,
        activeCount: PropTypes.number.isRequired,
        filter: PropTypes.string.isRequired,
        onClearCompleted: PropTypes.func.isRequired,
    };

    render() {
        const { totalCount, activeCount, completedCount, filter, onClearCompleted } = this.props;
        let count = totalCount;

        switch (filter) {
            case SHOW_ACTIVE:
                count = activeCount;
                break;
            case SHOW_COMPLETED:
                count = completedCount;
                break;
            case SHOW_ALL:
            default:
                count = totalCount;
                break;
        }

        return (
            <footer className="footer" data-testid="footer">
                <span className="todo-count" data-testid="todo-count">{`${count} ${count === 1 ? "item" : "items"} left!`}</span>
                <ul className="filters" data-testid="footer-navigation">
                    <li>
                        <a className={classnames({ selected: filter === SHOW_ALL })} href={`#${SHOW_ALL}`}>
                            All
                        </a>
                    </li>
                    <li>
                        <a className={classnames({ selected: filter === SHOW_ACTIVE })} href={`#${SHOW_ACTIVE}`}>
                            Active
                        </a>
                    </li>
                    <li>
                        <a className={classnames({ selected: filter === SHOW_COMPLETED })} href={`#${SHOW_COMPLETED}`}>
                            Completed
                        </a>
                    </li>
                </ul>
                {completedCount > 0 && (
                    <button className="clear-completed" data-testid="clear-completed" onClick={onClearCompleted}>
                        Clear completed
                    </button>
                )}
            </footer>
        );
    }
}
