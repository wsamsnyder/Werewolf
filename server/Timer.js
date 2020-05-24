class Timer {
  // might want to take the callback on first call
  constructor() {
    this.time = 0;
    this.intervalID = null;
  }

  // set
  set(timeLimit) {
    // needs to be in seconds
    this.time = timeLimit;
  }

  // start -> takes a callback that is the namespace and room to emit on
  start(callback) {
    this.intervalID = setInterval(() => {
      callback(this.time -= 1);
      if (this.time <= 0) {
        clearInterval(this.intervalID);
      }
    }, 1000);
  }

  // stop
  stop() {
    clearInterval(this.intervalID);
  }

  // add? -> extend current time by x
  add(additionalTime) {
    this.time += additionalTime;
  }
}

exports.Timer = Timer;
