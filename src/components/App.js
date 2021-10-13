import React, { Fragment } from 'react';
import TaskCreate from './TaskCreate';
import TaskList from './TaskList';
import moment from 'moment';
class App extends React.Component {
  constructor(props) { 
    super(props);

    this.handleCreateTaskOnSubmit = this.handleCreateTaskOnSubmit.bind(this);
    this.handleCompletedTaskOnClick = this.handleCompletedTaskOnClick.bind(this);

    this.state = JSON.parse(window.localStorage.getItem('state')) || {
      tasks: []
    }; 
  }

  setState(state) {
    window.localStorage.setItem('state', JSON.stringify(state));
    super.setState(state);
  }

  handleCreateTaskOnSubmit(task) {
    let tasks = this.state.tasks;
    tasks.push(task);
    tasks = this.sortTasks(tasks);

    this.setState({ tasks });
  }

  handleCompletedTaskOnClick(tasks) {
    tasks = this.sortTasks(tasks);
    this.setState({ tasks });
  }

  sortTasks(tasks) {
    let incompletedTasks = tasks.filter((task) => {
      return !task.completed;
    }).sort((a, b) => moment(a.dueDate).valueOf() - moment(b.dueDate).valueOf());

    let completedTasks = tasks.filter((task) => {
      return task.completed;
    }).sort((a, b) => moment(a.completedDate).valueOf() - moment(b.completedDate).valueOf());
 
    return[...incompletedTasks, ...completedTasks];
  }

  render() {
    return (
      <Fragment>
        <div className="ui container">
          <div className="ui clearing segment">
            <h2 className="ui header">Task list</h2>
          </div>
          <div className="ui clearing segment">
            <TaskCreate
              tasks={this.state.tasks} 
              handleCreateTaskOnSubmit={this.handleCreateTaskOnSubmit} />
          </div>
          <div className="ui clearing segment">
            <div className="ui horizontal list">
              <div className="item">
                <span className={"circle completed-task"}></span>
              </div>
              <div className="item">Completed tasks</div>
              <div className="item">
                <span className={"circle late-task"}></span> 
              </div>
              <div className="item">Overdue task</div>
            </div>
            <hr />
            <TaskList
              tasks={this.state.tasks}
              handleCompletedTaskOnClick={this.handleCompletedTaskOnClick} />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default App;