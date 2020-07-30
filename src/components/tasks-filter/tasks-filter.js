import React from 'react';
import PropTypes from 'prop-types'
import './tasks-filter.css';

const filterButtons = [
  { name: 'all', label: 'All' },
  { name: 'active', label: 'Active' },
  { name: 'completed', label: 'Completed' },
];

const TasksFilter = ({ filter, onFilterChange }) => {
  const buttons = filterButtons.map(({ name, label }) => {
    const isActive = name === filter;
    const classNames = `${isActive ? 'selected' : ''}`;
    return (
      <li>
        <button
          key={name}
          className={classNames}
          onClick={() => {
            onFilterChange(name);
          }}
          type="submit"
        >
          {label}
        </button>
      </li>
    );
  });
  return <ul className="filters">{buttons}</ul>;
};

TasksFilter.defaultProps = {
    filter: 'all',
    onFilterChange: () => {}
};

TasksFilter.propTypes = {
    filter: PropTypes.string,
    onFilterChange: PropTypes.func
};

export default TasksFilter;
