import io from 'socket.io-client';

// joins namespace and the townspeople chat
class CommandSocket {
  constructor(gameId, username) {
    this.username = username;
    this.gameId = gameId;
    this.namespace = io.connect(`/${this.gameId}`);
  }

  initialListeners(playerListCb, timeCb, roleAssignmentCb) {
    this.namespace.on('connect', () => {
      console.log('connected', this.gameId);
      this.namespace.emit('firstConnection', this.gameId, this.username);
    });

    this.namespace.on('time', (time) => timeCb(time));

    this.namespace.on('newPlayer', (players) => {
      playerListCb(players);
    });

    this.namespace.on('roleAssignment', (role) => {
      roleAssignmentCb(role);
      console.log('role assigned!', role);
    });

    // this.namespace.on('disconnect', () => {
    //   callback({ username: this.username, message: 'has disconnected' });
    // });
  }

  // setTime
  setTime(roundTime) {
    console.log('setting time');
    this.namespace.emit('setTime', roundTime);
  }

  // startTime
  startTime() {
    console.log('starting time');
    this.namespace.emit('startTime');
  }

  // pauseTime
  pauseTime() {
    console.log('pausing time');
    this.namespace.emit('pauseTime');
  }

  // startGame
  startGame() {
    console.log('starting game');
    this.namespace.emit('startGame');
  }
}

export default CommandSocket;
