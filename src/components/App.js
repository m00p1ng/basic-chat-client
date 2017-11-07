import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import Header from './Header';
import InboxList from './InboxList';
import ChatConversation from './ChatConversation';


class App extends Component {
  constructor() {
    super();

    this.state = {
      newMessages: [],
      selectedUser: '',
    }

    this.handleSelectedUser = this.handleSelectedUser.bind(this);
  }

  componentDidMount() {
    const URL = 'https://b-line.herokuapp.com';
    const socket = openSocket(URL);

    socket.on('newEvents', (events) => {
      this.setState({
        ...this.state,
        newMessages: events,
      });
    });
  }

  handleSelectedUser(userId) {
    if (this.state.selectedUser !== userId) {
      this.setState({
        ...this.state,
        selectedUser: userId,
      })
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div style={{ marginTop: '50px' }}>
          <div className="container">
            <div className="row">
              <InboxList handleSelectedUser={this.handleSelectedUser} newMessages={this.state.newMessages} />
              <ChatConversation selectedUser={this.state.selectedUser} newMessages={this.state.newMessages} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
