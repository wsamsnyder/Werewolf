import io from 'socket.io-client';

// joins namespace and the townspeople chat
class Command {
  constructor(gameId) {
    this.namespace = gameId;
    this.gameId = gameId;
  }

  initialListeners(playerListCb) {
    this.namespace = io.connect(`/${this.gameId}`);
    this.namespace.on('connect', () => {
      console.log('connected', this.gameId);
      this.namespace.emit('firstConnection', this.gameId);
    });

    this.namespace.on('newPlayer', (players) => {
      console.log(players);
      playerListCb(players);
    });

    // this.namespace.on('disconnect', () => {
    //   callback({ username: this.username, message: 'has disconnected' });
    // });
  }

  // takes a callback that updates the list of players
  // playerList(callback) {
  //   this.namespace.on('newPlayer', (players) => {
  //     callback(players);
  //   });
  // }
}

export default Command;
