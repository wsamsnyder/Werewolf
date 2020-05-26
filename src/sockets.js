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
      this.namespace.emit('message', { message: `${this.username} has joined`, username: this.username });
      // maybe a toast message on connection?
      callback('Successfully connected to room: ', this.namespaceId);
    });

    this.namespace.on('message', (message) => console.log(message));
  }
}

export default Socket;
