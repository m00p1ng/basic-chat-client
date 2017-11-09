import axios from 'axios';

const url = 'https://b-line.herokuapp.com/webhook-line';

const sendMessage = (msg, selectedUser) => {
  const messages = [
    {
      type: 'text',
      text: msg,
    },
  ];
  const data = {
    action: 'newMessages',
    messages: JSON.stringify(messages),
    sender: selectedUser,
  };

  axios.post(url, data, {
  })
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
}

export default sendMessage;