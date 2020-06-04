import io from 'socket.io-client';

// joins namespace and the townspeople chat
class Command {
  constructor(gameId) {
    this.namespace = gameId;
    this.gameId = gameId;
  }

  initialListeners(playerListCb, timeCb) {
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
    console.log('sending startTime');
    this.namespace.emit('startTime', true);
  }

  // stopTime

  // addTime
}

export default Command;
