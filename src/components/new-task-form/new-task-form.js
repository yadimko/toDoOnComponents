import React from 'react';
import './new-task-form.css';

export default class NewTaskForm extends React.Component {
  state = {
    label: '',
  };

  onLabelChange = (el) => {
    this.setState({
      label: el.target.value,
    });
  };

  onSubmit = (el) => {
    el.preventDefault();
    const { label } = this.state;
    this.setState({ label: '' });
    const cb = this.props.onItemAdded || (() => {});
    cb(label);
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          required
          value={this.state.label}
          onChange={this.onLabelChange}
          placeholder="What needs to be done?"
          autoFocus
        />
      </form>
    );
  }
}
