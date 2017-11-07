import React, { Component } from 'react';

class InboxList extends Component {
  constructor(props) {
    super(props);

    this.profiles = {};

    this.state = {
      profiles: []
    }
  }

  componentWillReceiveProps(nextProps) {
    let profiles = this.profiles;

    nextProps.newMessages.map((message) => {
      let userId = message.profile.userId;
      profiles[userId] = {
        'lasttext': message.message.text,
        'timestamp': message.timestamp,
        ...message.profile
      };
    })
    this.profiles = profiles;

    let newProf = [];
    for(let i in profiles) {
      newProf.push(profiles[i]);
    }

    newProf.sort((a, b) => {
      return a.timestamp - b.timestamp;
    });

    this.setState({profiles: newProf});
  }

  renderInbox(profiles) {
    if (!profiles.length) {
      return <h4>No message</h4>
    }

    let inboxContent = profiles.map((profile) => {
      return (
        <InboxContent
          key={profile.userId}
          displayName={profile.displayName}
          pictureUrl={profile.pictureUrl}
          statusMessage={profile.statusMessage}
          text={profile.lasttext}
        />
      )
    })

    return (
      <div className="card">
        <ul className="list-group">
          {inboxContent}
        </ul>
      </div>
    )
  }

  render() {
    return (
      <div className="col-md-4">
        {this.renderInbox(this.state.profiles)}
      </div>
    )
  }
};
const InboxContent = ({ displayName, text, pictureUrl, statusMessage }) => (
  <li className="list-group-item">
    <div style={{ float: 'left' }}>
      <img
        src={pictureUrl}
        style={{ display: 'block', marginRight: '20px' }}
        alt="pic"
        height="80"
        width="80"
      />
    </div>
    <div>
      <strong>{displayName}</strong>
      <p style={{ color: 'grey', display: 'inline', marginLeft: '5px' }}>{statusMessage}</p>
      <p style={{ color: 'grey' }}>{text}</p>
    </div>
  </li>
);

export default InboxList;
