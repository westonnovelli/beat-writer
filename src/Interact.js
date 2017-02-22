import React from 'react';
import ReactTouchEvents from 'react-touch-events';

export default class Interact extends React.Component {

	handleSwipe(direction) {
		if (direction === 'right' || direction === 'left') {
			this.props.onInteract();
		}
	}

	render() {
		return (
			<ReactTouchEvents
				onTap={this.props.tap && this.props.onInteract}
				onSwipe={this.props.swipe && this.handleSwipe.bind(this)}
			>
				<div className={`interact ${this.props.className}`}>
					{this.props.children}
				</div>
			</ReactTouchEvents>
		);
	}
}
