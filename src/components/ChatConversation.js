import React, { Component } from 'react';
import axios from 'axios';

class ChatConversation extends Component {
  constructor(props) {
    super(props);
    this.handleSendMessage = this.handleSendMessage.bind(this);
  }

  handleSendMessage(msg) {
    const url = 'https://b-line.herokuapp.com/webhook-line';
    const messages = [
      {
        type: 'text',
        text: msg,
      },
    ];
    const data = {
      action: 'newMessages',
      messages: JSON.stringify(messages),
      sender: 'Ufe5d05be7c7a5314dc03f43303da8198',
    };

    axios.post(url, data, {
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  renderMessage() {
    return [...Array(2)].map((x, i) => (<MsgBubble
      key={i}
      pictureUrl="http://placehold.it/60/FA6F57/fff&text=MP"
      displayName="Mooping"
      text="Hello world"
    />))
  }

  render() {
    return (
      <div className="col-md-8">
        <div className="card" style={{ padding: '20px' }}>
          <div className="panel panel-primary">
            <div className="panel-heading">
              <div className="panel-body">
                <ul className="chat">
                  {this.renderMessage()}
                  <MsgBubble
                    pictureUrl="http://placehold.it/60/00A5A5/fff&text=ME"
                    displayName="ME"
                    text="test"
                  />
                </ul>
              </div>
              <MsgInput handleSendMessage={this.handleSendMessage} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const MsgBubble = ({ pictureUrl, displayName, text }) => (
  <li>
    <img src={pictureUrl} alt="User Avatar" style={{ float: 'left', margin: '5px 20px 5px 0' }} />
    <div className="chat-body clearfix">
      <div className="header">
        <strong>{displayName}</strong>
      </div>
      <p>{text}</p>
    </div>
  </li>
);

const MsgInput = ({ handleSendMessage }) => {
  let msgInput;

  const onSubmit = (e) => {
    e.preventDefault();
    handleSendMessage(msgInput.value);
    msgInput.value = '';
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="panel-footer" style={{ marginTop: '20px' }}>
        <div className="input-group">
          <input
            type="text"
            className="form-control input-sm"
            placeholder="Type your message here..."
            ref={el => msgInput = el}
          />
          <div className="input-group-btn">
            <button className="btn btn-warning btn-sm" id="btn-chat" type="submit"> Send</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ChatConversation;
