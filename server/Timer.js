class Timer {
  // might want to take the callback on first call
  constructor() {
    this.time = 0;
    this.lastTime = 0;
    this.intervalID = null;
  }

  // set
  set(timeLimit) {
    // needs to be in seconds
    this.time = timeLimit;
    this.lastTime = timeLimit;
  }

  // start -> takes a callback that is the namespace and room to emit on
  start(callback) {
    this.intervalID = setInterval(() => {
      callback(this.time -= 1);
      if (this.time <= 0) {
        clearInterval(this.intervalID);
        this.time = this.lastTime;
      }
    }, 1000);
  }

  // stop
  pause() {
    clearInterval(this.intervalID);
  }

  // add? -> extend current time by x
  add(additionalTime) {
    this.time += additionalTime;
  }
}

exports.Timer = Timer;
