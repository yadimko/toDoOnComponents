import React from 'react';
import * as fns from 'date-fns';
import PropTypes from 'prop-types'
import './task.css';

export default class Task extends React.Component {
  state = {
    label: '',
    date: fns.formatDistanceToNow(this.props.date, { includeSeconds: true }),
  };

  static defaultProps = {
    editing: false,
    onItemDestroyButton: () => {},
    onItemEditButton: () => {},
    onLabelChange: () => {}
  }

  static propTypes = {
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    editing: PropTypes.bool,
    onItemDestroyButton: PropTypes.func,
    onItemEditButton: PropTypes.func,
    onLabelChange: PropTypes.func
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  onLabelChange = (el) => {
    this.setState({
      label: el.target.value,
    });
  };

  onSubmit = (el) => {
    el.preventDefault();
    const { label } = this.state;
    this.setState({ label: '' });
    const cb = this.props.onLabelChange;
    cb(this.props.id, label);
  };

  tick() {
    this.setState({ date: fns.formatDistanceToNow(this.props.date, { includeSeconds: true }) });
  }

  render() {
    const { label, editing, onItemDestroyButton, onItemEditButton } = this.props;
    return (
      <div>
        <input className="toggle" type="checkbox" />
        <label>
          {editing ? (
            <form onSubmit={this.onSubmit}>
              <input
                type="text"
                className="edit"
                onChange={this.onLabelChange}
                autoFocus
                required
                placeholder={label}
                value={this.state.label || label}
              />
            </form>
          ) : (
            <span className="description">{label}</span>
          )}
          <span className="created">{this.state.date}</span>
        </label>
        <button className="icon icon-edit" onClick={onItemEditButton} type="submit"/>
        <button className="icon icon-destroy" onClick={onItemDestroyButton} type="submit"/>
      </div>
    );
  }
}
