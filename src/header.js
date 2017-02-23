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
      <button className="settings-btn btn" onClick={toggleSettings}><i className="fa fa-cog"/></button>
    ) : (
      <button className="save-btn btn" onClick={save}><i className="fa fa-download"/></button>
    );

    const input = (
      <input
        className="input"
        type="text"
        placeholder="Song Name"
        ref="name"
        onChange={this.changeName.bind(this)}
        value={name}
      />
    );

    return (
      <div className="header">
        <button className={`record-btn btn ${recording ? 'recording' : 'stopped'}`} onClick={toggleRecording}>
          {recording ? (
            <i className="fa fa-stop"/>
          ) : (
            <i className="fa fa-circle"/>
          )}
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
