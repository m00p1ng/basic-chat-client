import React, { Component } from 'react';

class MsgRoom extends Component {
  render() {
    return (
      <div className="list-group">
        <a className="list-group-item list-group-item-action active">
          Cras justo odio
  </a>
        <a className="list-group-item list-group-item-action">Dapibus ac facilisis in</a>
        <a className="list-group-item list-group-item-action">Morbi leo risus</a>
        <a className="list-group-item list-group-item-action">Porta ac consectetur ac</a>
        <a className="list-group-item list-group-item-action disabled">Vestibulum at eros</a>
      </div>
    )
  }
}

export default MsgRoom;