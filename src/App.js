import React, { Component } from 'react';
import _ from 'lodash';
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
      saving: false,
      name: '',
      content: []
    };
  }

  toggleRecording() {
    this.setState({
      recording: !this.state.recording,
      content: !this.state.recording ? [] : this.state.content
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
    if (_.isEmpty(this.state.name)) {
      this.setState({
        emptyName: true
      });
    } else {
      this.toggleSave();
    }
  }

  toggleSave() {
    this.setState({
      saving: !this.state.saving
    });
  }

  beat(mark) {
    if (!this.state.recording && !_.isEmpty(this.state.content)) {
      this.alert('overwrite');
    } else {
      this.setState({
        content: _.concat(this.state.content, mark)
      });
    }
  }

  off() {
    console.log('off');
  }

  render() {

    const header = !this.state.saving ? (
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
          <button onClick={this.save.bind(this)}>Save</button>
        </div>
    ) : (
      <Interact className="display-header" onInteract={this.toggleSave.bind(this)} swipe>{this.state.name}</Interact>
    );

    const interaction = !this.state.saving ? (
      <div className="interaction">
        <div className="down-beat-btn">
          <Interact className="down-beat-one" onInteract={() => this.beat(MARKS.ONE)} tap>BEAT</Interact>
          <Interact className="down-beat-five" onInteract={() => this.beat(MARKS.FIVE)} tap>BEAT</Interact>
        </div>
        <Interact className="off-beat-btn" onInteract={this.off} tap>OFF</Interact>
        <Interact className="transition" onInteract={() => this.beat(MARKS.CHANGE)} swipe>Transition</Interact>
      </div>
    ) : null;

    const body = (
      <div className="App">
        {header}
        <div className="output">
          <Content content={this.state.content} className="output"/>
        </div>
        {interaction}
      </div>
    );

    const alert = (
      <div className="alert">Empty Name</div>
    )

    return this.state.emptyName ? alert : body;
  }
}

export default App;
