import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import _ from 'lodash';
import Interact from './Interact';
import Header from './header';
import Content from './content';
import {MARKS, ALERTS, ALERT_TYPES} from './constants';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      settings: false,
      standard: true,
      simple: true,
      saving: false,
      alert: {},
      name: '',
      content: []
    };
  }

  clearAlert() {
    clearTimeout(this.state.timer);
    this.setState({
      alert: {},
      timer: null
    });
  }

  alert(alert) {
    let timeout = 5000;
    if (alert.type === ALERT_TYPES.NOTE) {
      timeout = 3000;
    }
    this.setState({
      timer: setTimeout(this.clearAlert.bind(this), timeout),
      alert: alert
    });
  }

  toggleRecording() {
    this.setState({
      recording: !this.state.recording,
      content: !this.state.recording ? [] : this.state.content,
      settings: !this.state.recording ? false : this.state.setttings
    });
  }

  setPreference(standard = true) {
    this.setState({
      standard
    });
  }

  setName(value) {
    this.setState({
      name: value
    });
  }

  save() {
    if (_.isEmpty(this.state.name)) {
      this.alert(ALERTS.EMPTY_NAME)
    } else {
      this.toggleSave();
      this.alert(ALERTS.SAVE_NOTE);
    }
  }

  toggleSave() {
    this.setState({
      saving: !this.state.saving,
      name: this.state.saving ? '' : this.state.name,
      content: this.state.saving ? [] : this.state.content
    });
  }

  settings() {
    this.setState({
      settings: !this.state.settings
    });
  }

  beat(mark) {
    if (this.state.recording) {
      this.setState({
        content: _.concat(this.state.content, mark)
      });
    } else {
      this.alert(ALERTS.RECORD);
    }
  }

  off() {
    console.log('off');
  }

  toggleSimple() {
    this.setState({
      simple: !this.state.simple
    });
  }

  toggleStandard() {
    this.setState({
      standard: !this.state.standard
    });
  }

  render() {
    const header = !this.state.saving ? (
      <Header
        name={this.state.name}
        content={this.state.content}
        settingsActive={this.state.settings}
        recording={this.state.recording}
        simple={this.state.simple}
        standard={this.state.standard}
        toggleStandard={this.toggleStandard.bind(this)}
        toggleSimple={this.toggleSimple.bind(this)}
        setName={this.setName.bind(this)}
        toggleSettings={this.settings.bind(this)}
        save={this.save.bind(this)}
        toggleRecording={this.toggleRecording.bind(this)}
      />
    ) : (
      <Interact className="display-header" onInteract={this.toggleSave.bind(this)} swipe>{this.state.name}</Interact>
    );

    const downBeat = (
      <div className="down-beat-btn">
        <Interact className="down-beat-one area" onInteract={() => this.beat(MARKS.ONE)} tap>One</Interact>
        <Interact className="down-beat-five area" onInteract={() => this.beat(MARKS.FIVE)} tap>Five</Interact>
      </div>
    );

    const offBeat = (
      <Interact className="off-beat-btn area" onInteract={this.off} tap>Off</Interact>
    );

    const interaction = !this.state.saving ? (
      <div className={`interaction ${!this.state.recording || this.state.simple ? 'show' : 'hide'}`}>
        {!this.state.standard ? downBeat : null}
        {offBeat}
        {this.state.standard ? downBeat : null}
        <Interact className="transition area" onInteract={() => this.beat(MARKS.CHANGE)} swipe>Change</Interact>
      </div>
    ) : null;

    const alert = !_.isEmpty(this.state.alert) ? (
      <Interact className={`alert ${this.state.alert.type}`} key="alert" onInteract={this.clearAlert.bind(this)} tap>
        {this.state.alert.type === ALERT_TYPES.NOTE ? <div className="loader animated"/> : null}
        {this.state.alert.message}
      </Interact>
    ) : null;

    return (
      <div className="App">
        <ReactCSSTransitionGroup
          transitionName="slide-up"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >{alert}</ReactCSSTransitionGroup>
        {header}
        <div className="output">
          <Content content={this.state.content} className="output"/>
        </div>
        {interaction}
      </div>
    );
  }
}

export default App;
