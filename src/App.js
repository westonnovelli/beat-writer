import React, { Component } from 'react';
import Interact from './Interact';
import Content from './content';
import {MARKS} from './constants';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      standard: true,
      simple: false,
      name: '',
      content: [
        MARKS.ONE,
        MARKS.FIVE,
        MARKS.ONE,
        MARKS.FIVE,
        MARKS.ONE,
        MARKS.FIVE,
        MARKS.ONE,
        MARKS.FIVE,
        MARKS.CHANGE,
        MARKS.ONE,
        MARKS.FIVE,
        MARKS.ONE,
        MARKS.ONE,
        MARKS.CHANGE,
        MARKS.FIVE,
        MARKS.CHANGE,
        MARKS.ONE,
        MARKS.ONE,
        MARKS.FIVE
      ]
    };
  }

  toggleRecording() {
    this.setState({
      recording: !this.state.recording
    });
  }

  setPreference(standard = true) {
    this.setState({
      standard
    });
  }

  setName() {
    this.setState({
      name: this.refs.name.value
    });
  }

  save() {
    alert('todo: save');
  }

  beatOne() {
    console.log('beat1');
  }

  beatFive() {
    console.log('beat5');
  }

  off() {
    console.log('off');
  }

  transition() {
    console.log('transition');
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <button onClick={this.toggleRecording.bind(this)}>
            {this.state.recording ? 'Stop' : 'Record'}
          </button>
          <input
            type="text"
            placeholder="Song Name"
            ref="name"
            onChange={this.setName.bind(this)}
            value={this.state.name}
          />
          <button onClick={this.save} disabled="">Save</button>
        </div>
        <Content content={this.state.content} className="output"/>
        <div className="interaction">
          <div className="down-beat-btn">
            <Interact className="down-beat-one" onInteract={this.beatOne} tap>BEAT</Interact>
            <Interact className="down-beat-five" onInteract={this.beatFive} tap>BEAT</Interact>
          </div>
          <Interact className="off-beat-btn" onInteract={this.off} tap>OFF</Interact>
          <Interact className="transition" onInteract={this.transition} swipe>Transition</Interact>
        </div>
      </div>
    );
  }
}

export default App;
