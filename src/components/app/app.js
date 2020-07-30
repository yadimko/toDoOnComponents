import React from 'react';
import * as _ from 'lodash';
import AppHeader from '../app-header';
import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';

import './app.css';

export default class App extends React.Component {
  id = _.uniqueId(0);

  state = {
    items: [],
    filter: 'all',
    search: '',
  };

  onItemAdded = (label) => {
    this.setState((state) => {
      const item = this.createItem(label);
      return { items: [...state.items, item] };
    });
  };

  toggleChange = (array, id, propName) => {
    const element = array.findIndex((el) => el.id === id);
    const oldItem = array[element];
    const value = !oldItem[propName];
    const item = { ...array[element], [propName]: value };
    return [...array.slice(0, element), item, ...array.slice(element + 1)];
  };

  onItemDestroyButton = (id) => {
    this.setState((state) => {
      const items = this.toggleChange(state.items, id, 'completed');
      return { items };
    });
  };

  onItemEditButton = (id) => {
    this.setState((state) => {
      const items = this.toggleChange(state.items, id, 'editing');
      return { items };
    });
  };

  onLabelChange = (id, label) => {
    this.onItemEditButton(id);
    this.setState((state) => {
      const element = state.items.findIndex((el) => el.id === id);
      const item = { ...state.items[element], label };
      const items = [...state.items.slice(0, element), item, ...state.items.slice(element + 1)];
      return { items };
    });
  };

  clearCompleted = () => {
    this.setState((state) => {
      const items = state.items.filter((item) => !item.completed);
      return { items };
    });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  filterItems(items, filter) {
    if (filter === 'all') {
      return items;
    }
    if (filter === 'active') {
      return items.filter((item) => !item.completed);
    }
    if (filter === 'completed') {
      return items.filter((item) => item.completed);
    }
  }

  createItem(label) {
    return {
      id: ++this.id,
      label,
      completed: false,
      editing: false,
      date: new Date(),
    };
  }

  searchItems(items, search) {
    if (search.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(search.toLowerCase()) > -1;
    });
  }

  render() {
    const { items, filter, search } = this.state;
    const doneCount = items.filter((item) => item.completed).length;
    const toDoCount = items.length - doneCount;
    const visibleItems = this.searchItems(this.filterItems(items, filter), search);

    return (
      <section className="todoapp">
        <AppHeader />
        <NewTaskForm onItemAdded={this.onItemAdded} />
        <section className="main">
          <TaskList
            items={visibleItems}
            onLabelChange={this.onLabelChange}
            onItemAdded={this.onItemAdded}
            onItemDestroyButton={this.onItemDestroyButton}
            onItemEditButton={this.onItemEditButton}
          />
        </section>
        <Footer
          toDoCount={toDoCount}
          clearCompleted={this.clearCompleted}
          filter={filter}
          onFilterChange={this.onFilterChange}
        />
      </section>
    );
  }
}
