import React, { Component } from 'react';
import Header from './Header';
import InboxList from './InboxList';
import ChatConversation from './ChatConversation';
import subscribeNewEvents from '../api/socket';
import sendMessage from '../api/sendMessage';


class App extends Component {
  constructor() {
    super();

    this.state = {
      profiles: [],
      selectedUser: '',
      selectedUserMessages: [],
    }

    this.profiles = {};
    this.allMessages = {};

    this.handleSelectedUser = this.handleSelectedUser.bind(this);
    this.handleSendMessage = this.handleSendMessage.bind(this);
  }

  componentDidMount() {
    subscribeNewEvents((event) => {
      const selectedUserMessages = this.updateMessages(event);

      this.setState({
        ...this.state,
        profiles: this.updateProfiles(event),
        selectedUserMessages,
      });
    })
  }

  updateProfiles(newMessages) {
    let profiles = this.profiles;

    newMessages.forEach((message) => {
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
      return b.timestamp - a.timestamp;
    });

    return newProf;
  }

  updateMessages(newMessages) {
    let allMessages = this.allMessages;

    newMessages.forEach((msg) => {
      let userId = msg.profile.userId;
      let newMsg = {
        'text': msg.message.text,
        'timestamp': msg.timestamp,
        'msgId': msg.message.id,
        ...msg.profile,
      }

      if (userId in allMessages) {
        allMessages[userId].push(newMsg);
      } else {
        allMessages[userId] = [newMsg];
      }
    });

    this.allMessages = allMessages;

    if (this.state.selectedUser) {
      const selectedUserMessages = allMessages[this.state.selectedUser];
      return selectedUserMessages;
    }
    return [];
  }

  handleSelectedUser(userId) {
    this.setState({
      ...this.state,
      selectedUser: userId,
      selectedUserMessages: this.allMessages[userId],
    })
  }

  handleSendMessage(msg) {
    let selectedUser = this.state.selectedUser;
    this.allMessages[selectedUser].push({
      pictureUrl: "http://placehold.it/60/00A5A5/fff&text=ME",
      displayName: "ME",
      text: msg,
    })

    sendMessage(msg, selectedUser);

    if (selectedUser) {
      let selectedUserMessages = this.allMessages[selectedUser];
      this.setState({
        ...this.state,
        selectedUserMessages,
      })
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div style={{ marginTop: '50px' }}>
          <div className="container">
            <div className="row">
              <InboxList
                handleSelectedUser={this.handleSelectedUser}
                profiles={this.state.profiles}
              />
              <ChatConversation
                selectedUser={this.state.selectedUser}
                selectedUserMessages={this.state.selectedUserMessages}
                handleSendMessage={this.handleSendMessage}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
