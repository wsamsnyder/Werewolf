import io from 'socket.io-client';

// joins namespace and the townspeople chat
class Socket {
  constructor(namespaceId, username, userId, gameId, chatRoom) {
    this.namespaceId = namespaceId;
    this.username = username;
    this.userId = userId;
    this.gameId = gameId;
    this.chatRoom = chatRoom;
  }

  joinNamespace(callback) {
    this.namespace = io.connect(`/${this.namespaceId}`);
    console.log('attempting to join channel: ', this.chatRoom);
    this.namespace.on('connect', () => {
      console.log('connected');
      this.namespace.emit('firstConnection', this.username, this.userId, this.gameId, this.chatRoom);
    });

    this.namespace.on('message', (message) => {
      callback(message);
    });

    this.namespace.on('disconnect', () => {
      callback({ username: this.username, message: 'has disconnected' });
    });
  }

  sendMessage(message) {
    this.namespace.emit('message', { username: this.username, message });
  }
}

export default Socket;
