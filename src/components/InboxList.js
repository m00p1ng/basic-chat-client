import React from 'react';

const InboxList = ({ profiles, handleSelectedUser }) => {
  let renderInbox = (profiles) => {
    if (!profiles.length) {
      return <h4>No message</h4>
    }

    let inboxContent = profiles.map((profile) => {
      return (
        <InboxContent
          key={profile.userId}
          profile={profile}
          handleSelectedUser={handleSelectedUser}
        />
      )
    })

    return (
      <ul className="list-group">
        {inboxContent}
      </ul>
    )
  }

  return (
    <div className="col-md-4">
      <div className="panel panel-primary">
        <div className="panel-heading">
          <div className="panel-body">
            {renderInbox(profiles)}
          </div>
        </div>
      </div>
    </div>
  )
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
      <p style={{ color: 'grey' }}>{profile.lasttext}</p>
    </div>
  </li>
);

export default InboxList;
