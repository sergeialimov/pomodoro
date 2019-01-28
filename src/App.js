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
      hours: 0,
      minutes: 0,
      seconds: 0,
      paused: true,
    };
    this.increaseBreak = this.increaseBreak.bind(this);
    this.decreaseBreak = this.decreaseBreak.bind(this);
    this.increaseSession = this.increaseSession.bind(this);
    this.decreaseSession = this.decreaseSession.bind(this);
    this.countTime = this.countTime.bind(this);
  }

  increaseBreak() {
    if (this.state.break + 1 <= 10) {
      this.setState({
        break: this.state.break + 1,
      });
    }
  }

  decreaseBreak() {
    if (this.state.break - 1 >= 0) {
      this.setState({
        break: this.state.break - 1,
      });
    }
  }

  increaseSession() {
    if (this.state.session + 1 <= 60) {
      this.setState({
        session: this.state.session + 1,
      });
    }
  }

  decreaseSession() {
    if (this.state.session - 1 >= 0) {
      this.setState({
        session: this.state.session - 1,
      });
    }
  }

  countTime = () => {
    if (this.state.paused) {
      this.setState({
        paused: false,
      });
      const date = new Date();
      // date.setMinutes(date.getMinutes());
      // date.setMinutes(date.getMinutes() + this.state.session);
      setInterval(() => {
        if (!this.state.paused) {
          date.setSeconds(date.getSeconds() - 1);
          this.setState({
            minutes: date.getMinutes(),
            seconds: date.getSeconds(),
          });
        }
      }, 1000);
    } else {
      this.setState({
        paused: true,
      });
    }
  }

  render() {
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
            <p id="time">{this.state.minutes}:{this.state.seconds}</p>
          </div>
          <div id="buttons" onClick={this.countTime}>start</div>
        </div>
      </div>
    );
  }
}

export default App;
