import React from 'react';
import PropTypes from "prop-types"
import Task from '../task';
import './task-list.css';

const TaskList = ({ items, onItemDestroyButton, onItemEditButton, onLabelChange }) => {
  const elements = items.map((item) => {
    const { id, completed, editing, ...itemProps } = item;
    let className = '';
    if (completed) {
      className += ' completed';
    }
    if (editing) {
      className += ' editing';
    }
    return (
      <li key={id} className={className}>
        <Task
          {...itemProps}
          id={id}
          editing={editing}
          onLabelChange={onLabelChange}
          onItemDestroyButton={() => onItemDestroyButton(id)}
          onItemEditButton={() => onItemEditButton(id)}
        />
      </li>
    );
  });

  return <ul className="todo-list">{elements}</ul>;
};

TaskList.defaultProps = {
  onItemDestroyButton: () => {},
  onItemEditButton: () => {},
  onLabelChange: () => {}
};

TaskList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onItemDestroyButton: PropTypes.func,
  onItemEditButton: PropTypes.func,
  onLabelChange: PropTypes.func
};

export default TaskList;
