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
    this.countTime = this.countTime.bind(this);
    this.test = this.test.bind(this);
  }

  componentDidMount() {
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

  componentWillUnmount() {
     clearInterval(this.state.intervalId);
  }

  test() {
    this.setState({
      paused: !this.state.paused,
    });
  }

  count = () => {
    // if (this.state.paused) {
    //   this.setState({
    //     paused: false,
    //   });
      const localDate = this.state.date;
      // localDate.setMinutes(localDate.getMinutes() + this.state.session);
      // setInterval(() => {
        if (!this.state.paused) {
          localDate.setSeconds(localDate.getSeconds() - 1);
          this.setState({
            date: localDate,
          });
        }
    //   });
    // } else {
    //   this.setState({
    //     paused: true,
    //   });
    // }
  }

  countTime = () => {
    if (this.state.paused) {
      this.setState({
        paused: false,
      });
      const localDate = this.state.date;
      // localDate.setMinutes(localDate.getMinutes() + this.state.session);
      setInterval(() => {
        if (!this.state.paused) {
          localDate.setSeconds(localDate.getSeconds() - 1);
          this.setState({
            date: localDate,
          });
        }
      }, 1000);
    } else {
      this.setState({
        paused: true,
      });
    }
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
      const currentMinutes = this.state.date.getMinutes();
      this.setState({
        session: this.state.session + 1,
        date: new Date(new Date().setHours(0, currentMinutes + 1, 0, 0)),
      });
    }
  }

  decreaseSession() {
    if (this.state.session - 1 >= 0) {
      const currentMinutes = this.state.date.getMinutes();
      this.setState({
        session: this.state.session - 1,
        date: new Date(new Date().setHours(0, currentMinutes - 1, 0, 0)),
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
          <div id="buttons" onClick={this.test}>start/pause</div>
        </div>
      </div>
    );
  }
}

export default App;
