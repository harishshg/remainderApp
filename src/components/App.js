import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addReminder, deleteReminder,clearReminders } from '../actions';
import moment from 'moment';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      text: '',
      dueDate: ''
    }
  }

  addReminder(){
    this.props.addReminder(this.state.text, this.state.dueDate);
  }

  deleteReminder(id){
    this.props.deleteReminder(id);
  }
  clearReminders(){
    this.props.clearReminders();
  }
  renderReminders() {
    const { reminders } = this.props;
    return (
      <ul className="list-group ">
        {
          reminders.map(remainder => {
            return (
              <li key={remainder.id} className="list-group-item">
                <div className="list-item">
                  <div>{remainder.text}</div>
                  <div><em>{moment(new Date(remainder.dueDate)).fromNow()}</em></div>
                </div>
                <div
                  className="list-item delete-button"
                  onClick={() => this.deleteReminder(remainder.id)}
                >
                  &#x2715;
                </div>
              </li>
            )
          })
        }
      </ul>
    )
  }
  render() {
    return (
      <div className="App">
        <div className="title">
          Remainder Pro
        </div>
        <div className="form-inline reminder-form">
          <div className="form-group">
            <input
              className="form-control"
              placeholder="I have to.."
              onChange={e => this.setState({text: e.target.value})}
            />
            <input
              className="form-control"
              type="datetime-local"
              onChange={e => this.setState({dueDate: e.target.value})}
            />
          </div>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => this.addReminder()}
          >Add Remainder</button>
          {this.renderReminders()}
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => this.clearReminders()}
          >Clear Remainders</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log('state',state);
  return {
    reminders: state
  }
}

export default connect(mapStateToProps,{addReminder, deleteReminder, clearReminders})(App);
