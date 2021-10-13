import React, { Fragment } from 'react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

import { Message } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css'
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import '../styles/main.css'
class TaskCreate extends React.Component {

  constructor(props) {
    super(props); 

    this.handleCreateTaskOnSubmit = this.handleCreateTaskOnSubmit.bind(this); 

    this.state = {
      id: 0,
      description: "",
      dueDate: moment().format("YYYY-MM-DD"),
      completed: false,
      completedDate: null,
      visibleMessage: false 
    }
  }

  handleDescriptionChange(e) {
    this.setState({ description: e.target.value });
  }

  handleDueDateOnChange(e, data) {
    let dueDate = data.value ? moment(data.value).format("YYYY-MM-DD"): moment().format("YYYY-MM-DD");
    this.setState({ dueDate });
  }

  handleCreateTaskOnSubmit(e) {
    e.preventDefault();

    let { dueDate, description, completed, completedDate } = this.state;

    let descriptionExists = this.props.tasks.find((task) => {
      return task.description == description
    });

    if (description == "") {
      return;
    }

    if (descriptionExists) {
      this.setState({ visibleMessage: true });

      setTimeout(() => {
        this.setState({ visibleMessage: false });
      }, 4000);
    } else {
      this.props.handleCreateTaskOnSubmit({
        id: uuidv4(),
        description, dueDate, completed,
        completedDate
      }); 

      this.setState({ description: "", dueDate: moment().format("YYYY-MM-DD") });
    }
  }

  handleDismiss = () => {
    this.setState({ visibleMessage: false });
  }

  render () {
    return (
      <Fragment>
        <form className="ui form" onSubmit={(e, data) => this.handleCreateTaskOnSubmit(e)}>
          <div className="fields">
            <div className="field">
              <label>Description</label>
              <input
                value={this.state.description}
                onChange={(e) => this.handleDescriptionChange(e)} />
            </div>
            <div className="field">
              <label>Due date</label>
              <SemanticDatepicker
                selected={(this.state.dueDate)}
                onChange={(e, data) => this.handleDueDateOnChange(e, data)} />
            </div>
          </div>
          {this.state.visibleMessage ? <Message
            onDismiss={this.handleDismiss}
            header='Task repeated.'
            content='This task is already listed.' />
          : null}
          <button className="ui button" type="submit">Save</button>
        </form>
      </Fragment>
    );
  }
}

export default TaskCreate;