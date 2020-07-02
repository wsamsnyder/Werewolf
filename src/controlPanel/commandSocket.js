import io from 'socket.io-client';

class CommandSocket {
  constructor(gameId, userId, username) {
    this.username = username;
    this.userId = userId;
    this.gameId = gameId;
    this.namespace = io.connect(`/${this.gameId}`);
  }

  initialListeners(playerListCb, timeCb, roleAssignmentCb, updateVoteTallyCb) {
    this.namespace.on('connect', () => {
      this.namespace.emit('firstConnection', this.gameId, this.userId);
    });

    this.namespace.on('time', (time) => timeCb(time));

    this.namespace.on('newPlayer', (players) => {
      playerListCb(players);
    });

    this.namespace.on('roleAssignment', (role) => {
      roleAssignmentCb(role);
    });

    this.namespace.on('vote', ({
      vote: {
        username: votingPlayer,
        votedFor,
      },
      voteTally,
    }) => {
      updateVoteTallyCb(voteTally, `${votingPlayer} voted for ${votedFor}`);
    });

    this.namespace.on('votingStart', () => {
      console.log('Voting has started!');
    });
  }

  startVote() {
    this.namespace.emit('startVote');
  }

  endVote() {
    this.namespace.emit('endVote');
  }

  vote(playerNomination) {
    this.namespace.emit('vote', this.username, playerNomination);
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
