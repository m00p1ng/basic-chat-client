import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import Header from './Header';
import InboxList from './InboxList';
import ChatConversation from './ChatConversation';


class App extends Component {
  constructor() {
    super();

    this.state = {
      newMessages: []
    }
  }

  componentDidMount() {
    const URL = 'https://b-line.herokuapp.com';
    const socket = openSocket(URL);

    socket.on('newEvents', (events) => {
      console.log(events);
      this.setState({newMessages: events});
    });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div style={{ marginTop: '50px' }}>
          <div className="container">
            <div className="row">
              <InboxList newMessages={this.state.newMessages}/>
              <ChatConversation newMessages={this.state.newMessages}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
