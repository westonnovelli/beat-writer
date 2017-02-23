import React from 'react';
import _ from 'lodash';
import Menu from './menu';

export default class Header extends React.Component {
  changeName() {
    this.props.setName(this.refs.name.value);
  }

  render() {
    const {
      content,
      simple,
      standard,
      toggleSettings,
      save,
      settingsActive,
      toggleSimple,
      toggleStandard,
      name,
      toggleRecording,
      recording
    } = this.props;

    const rightBtn = _.isEmpty(content) ? (
      <button className="settings-btn btn" onClick={toggleSettings}>Settings</button>
    ) : (
      <button className="save-btn btn" onClick={save}>Save</button>
    );

    const input = !settingsActive ? (
      <input
        className="input"
        type="text"
        placeholder="Song Name"
        ref="name"
        onChange={this.changeName.bind(this)}
        value={name}
      />
    ) : null;

    return (
      <div className="header">
        <button className="record-btn btn" onClick={toggleRecording}>
          {recording ? 'Stop' : 'Record'}
        </button>
        <Menu
          settingsActive={settingsActive}
          simple={simple}
          standard={standard}
          toggleSimple={toggleSimple}
          toggleStandard={toggleStandard}
        />
        {input}
        {rightBtn}
      </div>
    );
  }
}
