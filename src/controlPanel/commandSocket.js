import io from 'socket.io-client';

// joins namespace and the townspeople chat
class CommandSocket {
  constructor(gameId) {
    this.gameId = gameId;
  }

  initialListeners(playerListCb) {
    this.namespace = io.connect(`/${this.gameId}`);
    this.namespace.on('connect', () => {
      console.log('connected', this.gameId);
      this.namespace.emit('firstConnection', this.gameId);
    });

    this.namespace.on('newPlayer', (players) => {
      playerListCb(players);
    });

    // this.namespace.on('disconnect', () => {
    //   callback({ username: this.username, message: 'has disconnected' });
    // });


  }
  // setTime

  // startTime
  startTime() {
    this.namespace.emit('startTime', true);
  }

  // stopTime

  // addTime
}

export default CommandSocket;
