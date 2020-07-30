import React from 'react';
import PropTypes from 'prop-types';
import TasksFilter from '../tasks-filter';
import './footer.css';

const Footer = ({ toDoCount, clearCompleted, filter, onFilterChange }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{toDoCount} items left</span>
      <TasksFilter filter={filter} onFilterChange={onFilterChange} />
      <button className="clear-completed" onClick={clearCompleted} type="submit">
        Clear completed
      </button>
    </footer>
  );
};

Footer.defaultProps = {
    toDoCount: 0,
    filter: 'all',
    clearCompleted: () => {},
    onFilterChange: () => {}
};

Footer.propTypes = {
    toDoCount: PropTypes.number,
    filter: PropTypes.string,
    clearCompleted: PropTypes.func,
    onFilterChange: PropTypes.func
};

export default Footer;
