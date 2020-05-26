import io from 'socket.io-client';

// joins namespace and the townspeople chat
class Socket {
  constructor(namespaceId, username) {
    this.namespaceId = namespaceId;
    this.username = username;
  }

  joinNamespace(callback) {
    this.namespace = io.connect(`/${this.namespaceId}`);

    this.namespace.on('connect', () => {
      this.namespace.emit('connected', this.username);
      // maybe a toast message on connection?
      console.log('Successfully connected to room: ', this.namespaceId);
      callback('Successfully connected to room: ', this.namespaceId);
    });

    this.namespace.on('message', (message) => callback(message));
  }

  sendMessage(message) {
    this.namespace.emit('message', message);
  }
}

export default Socket;
