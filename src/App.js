import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      break: 0,
      session: 0,
      tillEnd: 0,
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
                <div id="break-decrement"></div>
                <div id="counter">{this.state.break}</div>
                <div id="session-decrement"></div>
              </div>
            </div>
            <div className="break-session">
              <div id="session-label">Session Length</div>
              <div id="wrapper">
                <div id="break-decrement"></div>
                <div id="counter">{this.state.session}</div>
                <div id="session-decrement"></div>
              </div>
            </div>
          </div>
          <div id="timer">
            <div id="timer-title">Session</div>
            <p id="time">{this.state.tillEnd}</p>
          </div>
          <div id="buttons">buttons</div>
        </div>
      </div>
    );
  }
}

export default App;
