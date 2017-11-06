import React, { Component } from 'react';
import MsgBubble from './MsgBubble'

class MsgChat extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="panel panel-primary">
            <div className="panel-heading">
              <span className="glyphicon glyphicon-comment"></span> Chat
              <div className="panel-body">
                <ul className="chat">
                  {
                    [...Array(10)].map((x, i) =>
                      <MsgBubble key={i} />
                    )
                  }
                </ul>
              </div>
              <div className="panel-footer">
                <div className="input-group">
                  <input id="btn-input" type="text" className="form-control input-sm" placeholder="Type your message here..." />
                  <span className="input-group-btn">
                    <button className="btn btn-warning btn-sm" id="btn-chat">
                      Send</button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MsgChat;