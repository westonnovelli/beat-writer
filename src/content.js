import React from 'react';
import _ from 'lodash';
import {MARKS} from './constants';
import './content.css';

export default function Content({content, className}) {
	const contentRender = _.map(content, (mark, i) => (
		<div className={`mark ${MARKS[mark]}`} key={i}/>
	));
	return (
		<div className={`content-display ${className}`}>
			{contentRender}
		</div>
	);
}
