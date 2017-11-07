import React, { Component } from 'react';

class InboxList extends Component {
  render() {
    return (
      <div className="col-md-4">
        <div className="card">
          <ul className="list-group">
            {[...Array(5)].map((x, i) => <InboxContent
              key={i}
              displayName="mooping"
              text="Hello world."/>
              )}
          </ul>
        </div>
      </div>
    )
  }
}

const InboxContent = ({displayName, text}) => (
  <li className="list-group-item">
    <div style={{float: "left"}}>
      <img
        src="http://placehold.it/60/FA6F57/fff&text=MP"
        style={{display: "block", marginRight: "20px"}}
        alt="pic"/>
    </div>
    <div>
      <strong>{displayName}</strong>
      <p style={{color: "grey"}}>{text}</p>
    </div>
  </li>
)

export default InboxList;