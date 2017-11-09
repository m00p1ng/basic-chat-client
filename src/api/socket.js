import openSocket from 'socket.io-client';

const URL = 'https://b-line.herokuapp.com';
const socket = openSocket(URL);

const subscribeNewEvents = (callback) => {
  socket.on('newEvents', (events) => {
    callback(events);
  });
}

export default subscribeNewEvents;