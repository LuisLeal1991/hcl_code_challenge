import React, { Fragment } from 'react';

import moment from 'moment';

import { List, Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import '../styles/main.css'

class TaskList extends React.Component {

  constructor(props) {
    super(props);

    this.handleDeleteTaskOnClick = this.handleDeleteTaskOnClick.bind(this); 
    this.handleCompletedTaskOnClick = this.handleCompletedTaskOnClick.bind(this);
  }
  
  handleCompletedTaskOnClick(taskId) {
    let tasks = this.props.tasks.map((task) => {
      if (task.id == taskId) {
        task.completed = (task.id == taskId) ? true: task.completed;
        task.completedDate = moment().format("YYYY-MM-DD HH:mm:ss");
      }

      return task;
    });

    this.props.handleCompletedTaskOnClick(tasks); 
  }

  handleDeleteTaskOnClick(taskId) {
    let tasks = this.props.tasks.filter((task) => task.id != taskId);
    console.log("eliminado",tasks,taskId);
    this.props.handleCompletedTaskOnClick(tasks);
  }

  statusTask(task) {
    let status = "";

    if (task.completed) {
      status = "COMPLETED"
    } else if (moment().isAfter(task.dueDate)) {
      status = "LATE";
    }

    return status;
  }

  render () {
    return (
      <Fragment>
        <List divided verticalAlign='middle'>
          {this.props.tasks.map((task) => {
            let statusStyle = "";
            let statusTask = this.statusTask(task);

            switch (statusTask) {
              case "COMPLETED":
                statusStyle = "completed-task"
                break;
              case "LATE":
                statusStyle = "late-task"
                break;
              default:
                break;
            }

            return <List.Item>
              {!task.completed ? <List.Content floated='right'>
                  <Button onClick={(e) => this.handleCompletedTaskOnClick(task.id)}>Completed</Button>
                  <Button onClick={(e) => this.handleDeleteTaskOnClick(task.id)}>x</Button>
                </List.Content>
              : null}

              <List.Content floated='left'>
                <span className={"circle" + " " + statusStyle}></span>
              </List.Content>
              <List.Content>{task.description}</List.Content>
              <List.Content><label style={{ fontWeight: "bold" }}>Due date:</label> {task.dueDate}
                {task.completed ?
                  <Fragment> | <label style={{ fontWeight: "bold" }}>Completed date:</label> {task.completedDate}
                  </Fragment>
                : null}
              </List.Content>
              
            </List.Item>
          })}
        </List>
      </Fragment>
    );
  }
}

export default TaskList;