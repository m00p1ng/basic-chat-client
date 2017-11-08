import React, { Component } from 'react';
import axios from 'axios';

class ChatConversation extends Component {
  constructor(props) {
    super(props);

    this.Allmessages = {}
    this.state = {
      messages: [],
    }

    this.handleSendMessage = this.handleSendMessage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedUser != "") {
      let selectedUser = nextProps.selectedUser;
      this.setState({ messages: this.Allmessages[selectedUser] })
    }

    let s = JSON.stringify(this.props.newMessages) === JSON.stringify(nextProps.newMessages)
    if (!s) {
      let Allmessages = this.Allmessages;

      nextProps.newMessages.map((msg) => {
        let userId = msg.profile.userId;
        let newMsg = {
          'text': msg.message.text,
          'timestamp': msg.timestamp,
          'msgId': msg.message.id,
          ...msg.profile,
        }

        if (userId in Allmessages) {
          Allmessages[userId].push(newMsg);
        } else {
          Allmessages[userId] = [newMsg];
        }
      });
      this.Allmessages = Allmessages;
    }
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
      sender: this.props.selectedUser,
    };

    axios.post(url, data, {
    })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));

    this.Allmessages[this.props.selectedUser].push({
      pictureUrl: "http://placehold.it/60/00A5A5/fff&text=ME",
      displayName: "ME",
      text: msg,
    })

    this.setState({ messages: this.Allmessages[this.props.selectedUser] })
  }

  renderMessages(messages) {
    return messages.map((message) => (
      <MsgBubble
        key={message.msgId}
        pictureUrl={message.pictureUrl}
        displayName={message.displayName}
        text={message.text}
      />
    ))
  }

  renderChatWindow() {
    if (this.props.selectedUser === "") {
      return "";
    }
    return (
      <div className="col-md-8">
        <div className="card" style={{ padding: '20px' }}>
          <div className="panel panel-primary">
            <div className="panel-heading">
              <div className="panel-body">
                <ul className="chat">
                  {this.renderMessages(this.state.messages)}
                </ul>
              </div>
              <MsgInput handleSendMessage={this.handleSendMessage} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return this.renderChatWindow();
  }
}

const MsgBubble = ({ pictureUrl, displayName, text }) => (
  <li>
    <img src={pictureUrl} alt="User Avatar" style={{ float: 'left', margin: '5px 20px 5px 0' }} height="80" width="80" />
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
