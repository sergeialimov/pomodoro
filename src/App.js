import React, { Component } from 'react';
import './App.css';
import arrowUp from './img/01.png';
import arrowDown from './img/02.png';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      break: new Date(new Date().setHours(0, 0, 7, 0)),
      breakPaused: true,
      mode: 'session',
      session: new Date(new Date().setHours(0, 0, 10, 0)),
      sessionCounter: 1,
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

  componentWillUnmount() {
     clearInterval(this.state.intervalId);
  }

  runSession() {
    const localTime = this.state.session;
    const intervalId = setInterval(() => {
      if (!this.state.sessionPaused) {
        localTime.setSeconds(localTime.getSeconds() - 1);
        this.setState({
          session: localTime,
        });
        if (localTime.getMinutes() === 0 && localTime.getSeconds() === 0) {
          this.setState({
            sessionPaused: true,
            breakPaused: false,
            mode: 'break',
          });
          clearInterval(this.state.intervalId);
          this.refresh();
          this.setState({
            breakPaused: false,
            mode: 'break',
          });
          this.runBreak();
        }
      }
    }, 1000);
    this.setState({ intervalId: intervalId });
  }

  runBreak() {
    const localTime = this.state.break;
    const intervalId = setInterval(() => {
      if (!this.state.breakPaused) {
        localTime.setSeconds(localTime.getSeconds() - 1);
        this.setState({
          break: localTime,
        });
        if (localTime.getMinutes() === 0 && localTime.getSeconds() === 0) {
          this.setState({
            breakPaused: true,
            sessionPaused: false,
          });
          clearInterval(this.state.intervalId);
          this.refresh();
          this.setState({
            sessionPaused: false,
          });
          this.runSession();
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
      session: new Date(new Date().setHours(0, 0, 10, 0)),
      sessionCounter: 1,
      break: new Date(new Date().setHours(0, 0, 7, 0)),
    });
  }

  increaseSession() {
    const minutes = this.state.session.getMinutes();
    if (this.state.sessionPaused && minutes <= 59) {
      this.setState({
        session: new Date(new Date().setHours(0, minutes + 1, 0, 0)),
        sessionCounter: this.state.sessionCounter + 1,
      });
    }
  }

  decreaseSession() {
    const minutes = this.state.session.getMinutes();
    if (this.state.sessionPaused && minutes >= 1) {
      this.setState({
        session: new Date(new Date().setHours(0, minutes - 1, 0, 0)),
        sessionCounter: this.state.sessionCounter - 1,
      });
    }
  }

  increaseBreak() {
    const minutes = this.state.break.getMinutes();
    if (this.state.sessionPaused && minutes <= 9) {
      this.setState({
        break: new Date(new Date().setHours(0, minutes + 1, 0, 0)),
      });
    }
  }

  decreaseBreak() {
    const minutes = this.state.break.getMinutes();
    if (this.state.sessionPaused && minutes >= 1) {
      this.setState({
        break: new Date(new Date().setHours(0, minutes - 1, 0, 0)),
      });
    }
  }

  render() {
    const time = this.state.mode === 'session' ? this.state.session : this.state.break;
    const title = this.state.mode === 'session' ? 'Session' : 'Break';
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
                <div id="counter">{this.state.break.getMinutes()}</div>
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
                <div id="counter">{this.state.sessionCounter}</div>
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
            <div id="timer-title">{title}</div>
            <p id="time">{time.getMinutes()}:{time.getSeconds()}</p>
          </div>
          <div id="buttons">
            <div id="playPause" onClick={this.startPause}>start/pause</div>
            <div id="refresh" onClick={this.refresh}>refresh</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
