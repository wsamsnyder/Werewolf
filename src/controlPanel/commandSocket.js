import io from 'socket.io-client';

class CommandSocket {
  constructor(gameId, username) {
    this.username = username;
    this.gameId = gameId;
    this.namespace = io.connect(`/${this.gameId}`);
  }

  initialListeners(playerListCb, timeCb, roleAssignmentCb) {
    this.namespace.on('connect', () => {
      this.namespace.emit('firstConnection', this.gameId, this.username);
    });

    this.namespace.on('time', (time) => timeCb(time));

    this.namespace.on('newPlayer', (players) => {
      playerListCb(players);
    });

    this.namespace.on('roleAssignment', (role) => {
      roleAssignmentCb(role);
    });
  }

  startVote() {
    this.namespace.emit('startVote');
  }

  vote(player) {
    this.namespace.emit('vote', this.username, this.gameId, player);
  }

  setTime(roundTime) {
    this.namespace.emit('setTime', roundTime);
  }

  startTime() {
    this.namespace.emit('startTime');
  }

  pauseTime() {
    this.namespace.emit('pauseTime');
  }

  startGame() {
    this.namespace.emit('startGame');
  }
}

export default CommandSocket;
