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
    for (let i in profiles) {
      newProf.push(profiles[i]);
    }

    newProf.sort((a, b) => {
      return a.timestamp - b.timestamp;
    });

    this.setState({ profiles: newProf });
  }

  renderInbox(profiles) {
    if (!profiles.length) {
      return <h4>No message</h4>
    }

    let inboxContent = profiles.map((profile) => {
      return (
        <InboxContent
          key={profile.userId}
          profile={profile}
          handleSelectedUser={this.props.handleSelectedUser}
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
const InboxContent = ({ profile, handleSelectedUser }) => (
  <li className="list-group-item" onClick={() => { handleSelectedUser(profile.userId) }}>
    <div style={{ float: 'left' }}>
      <img
        src={profile.pictureUrl}
        style={{ display: 'block', marginRight: '20px' }}
        alt="pic"
        height="80"
        width="80"
      />
    </div>
    <div>
      <strong>{profile.displayName}</strong>
      <p style={{ color: 'grey', display: 'inline', marginLeft: '5px' }}>{profile.statusMessage}</p>
      <p style={{ color: 'grey' }}>{profile.lasttext}</p>
    </div>
  </li>
);

export default InboxList;
