import React, { Component } from 'react'

class MsgBubble extends Component {
  render() {
    return (
      <li className="left clearfix"><span className="chat-img pull-left">
        <img src="http://placehold.it/50/FA6F57/fff&text=" alt="User Avatar" className="img-circle" />
      </span>
        <div className="chat-body clearfix">
          <div className="header">
            <small className="pull-right text-muted"><span className="glyphicon glyphicon-time"></span>13 mins ago</small>
            <strong className="pull-left primary-font">Bhaumik Patel</strong>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare
              dolor, quis ullamcorper ligula sodales.
          </p>
        </div>
      </li>
    )
  }
}

export default MsgBubble;