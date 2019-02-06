import React, { Component } from 'react';
import './App.css';
import arrowUp from './img/01.png';
import arrowDown from './img/02.png';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      break: 0,
      session: 1,
      paused: true,
      date: new Date(new Date().setHours(0, 1, 0, 0)),
    };
    this.increaseBreak = this.increaseBreak.bind(this);
    this.decreaseBreak = this.decreaseBreak.bind(this);
    this.increaseSession = this.increaseSession.bind(this);
    this.decreaseSession = this.decreaseSession.bind(this);
    this.startPause = this.startPause.bind(this);
    this.launchTimer = this.launchTimer.bind(this);
  }

  componentWillUnmount() {
     clearInterval(this.state.intervalId);
  }

  launchTimer() {
    const localDate = this.state.date;
    const intervalId = setInterval(() => {
    if (!this.state.paused) {
      localDate.setSeconds(localDate.getSeconds() - 1);
      this.setState({
        date: localDate,
      });
     }
   }, 1000);
   this.setState({ intervalId: intervalId });
  }

  startPause() {
    if (this.state.paused) {
      this.launchTimer();
    }
    clearInterval(this.state.intervalId);
    this.setState({
      paused: !this.state.paused,
    });
  }

  increaseSession() {
    if (this.state.session <= 59) {
      this.setState({
        session: this.state.session + 1,
        date: new Date(new Date().setHours(0, this.state.session + 1, 0, 0)),
      });
    }
  }

  decreaseSession() {
    if (this.state.session >= 1) {
      this.setState({
        session: this.state.session - 1,
        date: new Date(new Date().setHours(0, this.state.session - 1, 0, 0)),
      });
    }
  }

  increaseBreak() {
    if (this.state.break <= 9) {
      this.setState({
        break: this.state.break + 1,
      });
    }
  }

  decreaseBreak() {
    if (this.state.break >= 1) {
      this.setState({
        break: this.state.break - 1,
      });
    }
  }

  render() {
    const minutes = this.state.date.getMinutes();
    const seconds = this.state.date.getSeconds();
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
            <div id="timer-title">Session</div>
            <p id="time">{minutes}:{seconds}</p>
          </div>
          <div id="buttons" onClick={this.startPause}>start/pause</div>
        </div>
      </div>
    );
  }
}

export default App;
