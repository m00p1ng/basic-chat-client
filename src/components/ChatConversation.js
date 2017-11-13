import React from 'react';
import moment from 'moment';

const ChatConversation = ({ selectedUser, selectedUserMessages, handleSendMessage }) => {
  const renderMessages = (messages) => {
    return messages.map((message) => (
      <MsgBubble
        key={message.msgId}
        pictureUrl={message.pictureUrl}
        displayName={message.displayName}
        text={message.text}
        timestamp={message.timestamp}
      />
    ))
  }

  return (
    <div className="col-md-8 no-selection">
      <div className="card" style={{ padding: '20px' }}>
        <div className="panel panel-primary">
          <div className="panel-heading">
            <div className="panel-body" style={{overflowY: 'scroll'}}>
              <ul className="chat">
                {renderMessages(selectedUserMessages)}
              </ul>
            </div>
            {selectedUser ? <MsgInput handleSendMessage={handleSendMessage} /> : ""}
          </div>
        </div>
      </div>
    </div>
  )
}


const MsgBubble = ({ timestamp, pictureUrl, displayName, text }) => (
  <li>
    <img
      src={pictureUrl}
      alt="User Avatar"
      style={{ float: 'left', margin: '5px 20px 5px 0' }}
      height="80"
      width="80"
    />
    <div className="chat-body clearfix">
      <div className="header">
        <strong>{displayName}</strong>
        <span style={{fontSize: '0.9em', color: '#AAAAAA' }}> - {moment(timestamp).startOf("minute").fromNow()}</span>
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
            <button
              className="btn btn-warning btn-sm"
              id="btn-chat"
              type="submit"
            > Send</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ChatConversation;
