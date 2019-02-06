import React, { Component } from 'react';
import './App.css';
import arrowUp from './img/01.png';
import arrowDown from './img/02.png';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'session',
      break: 1,
      session: 1,
      sessionPaused: true,
      breakPaused: true,
      time: new Date(new Date().setHours(0, 0, 15, 0)),
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
    const localTime = this.state.time;
    const intervalId = setInterval(() => {
      if (!this.state.sessionPaused) {
        localTime.setSeconds(localTime.getSeconds() - 1);
        this.setState({
          time: localTime,
        });
        if (localTime.getMinutes() === 0 && localTime.getSeconds() === 0) {
          this.setState({
            sessionPaused: true,
            breakPaused: false,
            mode: 'break'
          });
          clearInterval(this.state.intervalId);
          this.refresh();
          this.runBreak();
        }
      }
    }, 1000);
    this.setState({ intervalId: intervalId });
  }

  runBreak() {
    this.setState({
      time: new Date(new Date().setHours(0, 0, 12, 0)),
    });
    const localTime = this.state.time;
    const intervalId = setInterval(() => {
      if (!this.state.breakPaused) {
        localTime.setSeconds(localTime.getSeconds() - 1);
        this.setState({
          time: localTime,
        });
        if (localTime.getMinutes() === 0 && localTime.getSeconds() === 0) {
          this.setState({
            breakPaused: true,
            sessionPaused: false,
          });
          clearInterval(this.state.intervalId);
          this.refresh();
          this.runSession();
        }
      }
    }, 1000);
    this.setState({ intervalId: intervalId });
  }

  startPause() {
    if (this.state.sessionPaused) {
      this.runSession();
    }
    clearInterval(this.state.intervalId);
    this.setState({
      sessionPaused: !this.state.sessionPaused,
    });
  }

  refresh() {
    this.setState({
      break: 1,
      session: 1,
      sessionPaused: true,
      breakPaused: true,
      time: new Date(new Date().setHours(0, 0, 15, 0)),
    });
  }

  increaseSession() {
    if (this.state.sessionPaused && this.state.session <= 59) {
      this.setState({
        session: this.state.session + 1,
        time: new Date(new Date().setHours(0, this.state.session + 1, 0, 0)),
      });
    }
  }

  decreaseSession() {
    if (this.state.sessionPaused && this.state.session >= 1) {
      this.setState({
        session: this.state.session - 1,
        time: new Date(new Date().setHours(0, this.state.session - 1, 0, 0)),
      });
    }
  }

  increaseBreak() {
    if (this.state.sessionPaused && this.state.break <= 9) {
      this.setState({
        break: this.state.break + 1,
      });
    }
  }

  decreaseBreak() {
    if (this.state.sessionPaused && this.state.break >= 1) {
      this.setState({
        break: this.state.break - 1,
      });
    }
  }

  render() {
    const minutes = this.state.time.getMinutes();
    const seconds = this.state.time.getSeconds();
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
                <div id="counter">{this.state.break}</div>
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
                <div id="counter">{this.state.session}</div>
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
            <p id="time">{minutes}:{seconds}</p>
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
