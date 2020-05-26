import io from 'socket.io-client';

// joins namespace and the townspeople chat
class Socket {
  constructor(namespaceId) {
    this.namespaceId = namespaceId;
  }

  joinNamespace(callback) {
    console.log(this.namespaceId);
    this.namespace = io.connect(`/${this.namespaceId}`);

    this.namespace.on('connect', () => {
      callback('connected to namespace: ', this.namespaceId);
    });

    this.namespace.on('message', (message) => callback(message));

    // this.namespace.on('a message', (data) => {
    //   console.log(data.message);
    // });
  }
}

export default Socket;
