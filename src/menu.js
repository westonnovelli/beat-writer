import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Interact from './Interact';

export default function Menu(props) {
  const contents = props.settingsActive ? (
    <div className="settings">
      <Interact className={`setting-option ${props.simple ? 'active' : 'inactive'}`} key="setting-simple" onInteract={props.toggleSimple.bind(this)} tap>Hints</Interact>
			<Interact className={`setting-option ${props.standard ? 'active' : 'inactive'}`} key="setting-standard" onInteract={props.toggleStandard.bind(this)} tap>Standard</Interact>
    </div>
  ) : null;

	return (
		<ReactCSSTransitionGroup
			transitionName="slide-down"
			transitionAppear={true}
			transitionAppearTimeout={500}
			transitionEnterTimeout={500}
			transitionLeaveTimeout={300}
		>{contents}</ReactCSSTransitionGroup>
	);
}
