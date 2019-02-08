import React, { Component } from 'react';
import './App.css';
import arrowUp from './img/01.png';
import arrowDown from './img/02.png';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      break: new Date(new Date().setHours(0, 5, 0, 0)),
      breakCounter: 5,
      breakPaused: true,
      mode: 'session',
      session: new Date(new Date().setHours(0, 25, 0, 0)),
      sessionCounter: 25,
      sessionPaused: true,
    };
    this.increaseBreak = this.increaseBreak.bind(this);
    this.decreaseBreak = this.decreaseBreak.bind(this);
    this.increaseSession = this.increaseSession.bind(this);
    this.decreaseSession = this.decreaseSession.bind(this);
    this.startPause = this.startPause.bind(this);
    this.runSession = this.runSession.bind(this);
    this.runBreak = this.runBreak.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  // autotests for FreeCodeCamp
  componentDidMount() {
    const script = document.createElement("script");
    script.src = "https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js";
    script.async = true;
    document.body.appendChild(script);
  }

  componentWillUnmount() {
     clearInterval(this.state.intervalId);
  }

  runSession() {
    const time = this.state.session;
    const intervalId = setInterval(() => {
      if (!this.state.sessionPaused && (time.getMinutes() > 0 || time.getSeconds() > 0)) {
        time.setSeconds(time.getSeconds() - 1);
        this.setState({
          session: time,
        });
      }
      if (time.getMinutes() === 0 && time.getSeconds() === 0) {
        setTimeout(() => {
          clearInterval(this.state.intervalId);
          this.setState({
            sessionPaused: true,
            session: this.state.sessionCounter,
            breakPaused: false,
            mode: 'break',
          });
          this.runBreak();
        }, 1000);
      }
    }, 1000);
    this.setState({ intervalId: intervalId });
  }

  runBreak() {
    const time = this.state.break;
    const intervalId = setInterval(() => {
      if (!this.state.breakPaused) {
        time.setSeconds(time.getSeconds() - 1);
        this.setState({
          break: time,
        });
        if (time.getMinutes() === 0 && time.getSeconds() === 0) {
          setTimeout(() => {
            clearInterval(this.state.intervalId);
            this.setState({
              break: this.state.breakCounter,
              breakPaused: true,
              mode: 'session',
              sessionPaused: false,
            });
            this.runSession();
          }, 1000);
        }
      }
    }, 1000);
    this.setState({ intervalId: intervalId });
  }

  startPause() {
    clearInterval(this.state.intervalId);
    if (this.state.mode === 'session') {
      if (this.state.sessionPaused) {
        this.runSession();
      }
      this.setState({
        sessionPaused: !this.state.sessionPaused,
      });
    } else {
      if (this.state.breakPaused) {
        this.runBreak();
      }
      this.setState({
        breakPaused: !this.state.breakPaused,
      });
    }
  }

  refresh() {
    this.setState({
      mode: 'session',
      sessionPaused: true,
      breakPaused: true,
      session: new Date(new Date().setHours(0, 25, 0, 0)),
      sessionCounter: 25,
      break: new Date(new Date().setHours(0, 5, 0, 0)),
      breakCounter: 5,
    });
  }

  increaseSession() {
    const minutes = this.state.session.getMinutes();
    const hours = this.state.session.getHours();
    if (this.state.sessionPaused && minutes < 60 && hours === 0) {
      this.setState({
        session: new Date(new Date().setHours(0, this.state.sessionCounter + 1, 0, 0)),
        sessionCounter: this.state.sessionCounter + 1,
      });
    }
  }

  decreaseSession() {
    const minutes = this.state.session.getMinutes();
    if (this.state.sessionPaused && minutes > 1) {
      this.setState({
        session: new Date(new Date().setHours(0, this.state.sessionCounter - 1, 0, 0)),
        sessionCounter: this.state.sessionCounter - 1,
      });
    }
  }

  increaseBreak() {
    const minutes = this.state.break.getMinutes();
    const hours = this.state.break.getHours();
    if (this.state.sessionPaused && minutes < 60  && hours === 0) {
      this.setState({
        break: new Date(new Date().setHours(0, this.state.breakCounter + 1, 0, 0)),
        breakCounter: this.state.breakCounter + 1,
      });
    }
  }

  decreaseBreak() {
    const minutes = this.state.break.getMinutes();
    if (this.state.sessionPaused && minutes > 1) {
      this.setState({
        break: new Date(new Date().setHours(0, this.state.breakCounter - 1, 0, 0)),
        breakCounter: this.state.breakCounter - 1,
      });
    }
  }

  render() {
    const time = this.state.mode === 'session' ? this.state.session : this.state.break;
    const timerLabel = this.state.mode === 'session' ? 'Session' : 'Break';
    let seconds = time.getSeconds();
    if (seconds < 10) {
      seconds = "0" + seconds
    };
    let minutes = time.getMinutes();
    if (minutes < 10) {
      minutes = "0" + minutes
    };

    return (
      <div className="App">
        <div className="pomodoro">
          <h1>Pomodoro Clock</h1>
          <div id="abc">
            <div className="break-session">
              <div id="break-label">Break Length</div>
              <div id="wrapper">
                <input
                  className="arrows"
                  id="break-decrement"
                  type="image"
                  src={arrowDown}
                  alt={'break down'}
                  onClick={this.decreaseBreak}
                />
                <div id="break-length">{this.state.breakCounter}</div>
                <input
                  className="arrows"
                  id="break-increment"
                  type="image"
                  src={arrowUp}
                  alt={'break up'}
                  onClick={this.increaseBreak}
                />
              </div>
            </div>
            <div className="break-session">
              <div id="session-label">Session Length</div>
              <div id="wrapper">
                <input
                  className="arrows"
                  id="session-decrement"
                  type="image"
                  src={arrowDown}
                  alt={'session down'}
                  onClick={this.decreaseSession}
                />
                <div id="session-length">{this.state.sessionCounter}</div>
                <input
                  className="arrows"
                  id="session-increment"
                  type="image"
                  src={arrowUp}
                  alt={'session up'}
                  onClick={this.increaseSession}
                />
              </div>
            </div>
          </div>
          <div id="timer">
            <div id="timer-label">{timerLabel}</div>
            <p id="time-left">{minutes}:{seconds}</p>
          </div>
          <div id="buttons">
            <div id="start_stop" onClick={this.startPause}>start/pause</div>
            <div id="reset" onClick={this.refresh}>refresh</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
