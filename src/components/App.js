import React, { Component } from 'react';
import Header from './Header';
import InboxList from './InboxList';
import ChatConversation from './ChatConversation';
import subscribeNewEvents from '../api/socket';
import sendMessage from '../api/sendMessage';
import LocalStorage from '../api/localStorage';


class App extends Component {
  constructor() {
    super();

    this.state = {
      profilesObj: {},
      profiles: [],
      selectedUser: '',
      allMessages: {},
      selectedUserMessages: [],
    }

    this.handleSelectedUser = this.handleSelectedUser.bind(this);
    this.handleSendMessage = this.handleSendMessage.bind(this);
  }

  componentWillMount() {
    const allMessages = LocalStorage.getData('allMessages');
    const profilesObj = LocalStorage.getData('profiles');

    if (profilesObj) {
      let newProf = [];
      for (let i in profilesObj) {
        newProf.push(profilesObj[i]);
      }

      newProf.sort((a, b) => {
        return b.timestamp - a.timestamp;
      })

      this.setState({
        profiles: newProf,
        profilesObj,
        allMessages,
      })
    }
  }

  componentDidMount() {
    subscribeNewEvents((event) => {
      const selectedUserMessages = this.updateMessages(event);
      const profiles = this.updateProfiles(event);

      this.setState({
        ...this.state,
        profiles,
        selectedUserMessages,
      });
    });
  }

  updateProfiles(newMessages) {
    let profilesObj = this.state.profilesObj;

    newMessages.forEach((message) => {
      let userId = message.profile.userId;
      profilesObj[userId] = {
        'lasttext': message.message.text,
        'timestamp': message.timestamp,
        ...message.profile
      };
    })

    this.setState({
      ...this.state,
      profilesObj,
    })
    LocalStorage.setData('profiles', profilesObj)

    let newProf = [];
    for (let i in profilesObj) {
      newProf.push(profilesObj[i]);
    }

    newProf.sort((a, b) => {
      return b.timestamp - a.timestamp;
    });

    return newProf;
  }

  updateMessages(newMessages) {
    let allMessages = this.state.allMessages;

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

    this.setState({
      ...this.state,
      allMessages,
    })
    LocalStorage.setData('allMessages', allMessages);

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
      selectedUserMessages: this.state.allMessages[userId],
    })
  }

  handleSendMessage(msg) {
    let selectedUser = this.state.selectedUser;
    let timestampNow = Date.now();
    let allMessages = this.state.allMessages;

    allMessages[selectedUser].push({
      pictureUrl: "http://placehold.it/60/00A5A5/fff&text=ME",
      displayName: "ME",
      text: msg,
      timestamp: timestampNow,
      msgId: 'me-' + timestampNow,
    })

    sendMessage(msg, selectedUser);

    if (selectedUser) {
      let selectedUserMessages = allMessages[selectedUser];
      this.setState({
        ...this.state,
        selectedUserMessages,
        allMessages,
      })
    }

    LocalStorage.setData('allMessages', allMessages);
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div style={{ marginTop: '50px' }}>
          <div className="container">
            <div className="card" style={{ padding: '20px' }}>
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
      </div>
    );
  }
}

export default App;
