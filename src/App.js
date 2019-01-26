import React, { Component } from 'react';
import './App.css';

class App extends Component {
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
                <div id="counter"></div>
                <div id="session-decrement"></div>
              </div>
            </div>
            <div className="break-session">
              <div id="session-label">Session Length</div>
              <div id="wrapper">
                <div id="break-decrement"></div>
                <div id="counter"></div>
                <div id="session-decrement"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
