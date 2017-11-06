import React, { Component } from 'react';
import Header from './Header'
import MsgRoom from './MsgRoom'
import MsgChat from './MsgChat'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <MsgRoom />
            </div>
            <div className="col-md-8">
              <MsgChat />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
