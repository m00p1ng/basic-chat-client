import React, { Component } from 'react';
import Header from './Header'
import InboxList from './InboxList'
import ChatConversation from './ChatConversation'
import openSocket from 'socket.io-client'


class App extends Component {
  constructor() {
    super();

    const URL = "https://b-line.herokuapp.com";
    const socket = openSocket(URL);

    socket.on('newEvents', (events) => {
      console.log(events);
    })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div style={{ marginTop: "50px" }}>
          <div className="container">
            <div className="row">
              <InboxList />
              <ChatConversation />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
