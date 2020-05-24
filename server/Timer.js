class Timer {
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
    console.log(this.intervalID);
    clearInterval(this.intervalID);
  }

  // add? -> extend current time by x
}

let timer = new Timer();

timer.set(10);
timer.start(console.log);

setTimeout(timer.stop, 3000);

// timer.start(console.log);

// exports.Timer = Timer;