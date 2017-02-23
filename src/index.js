import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

document.documentElement.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
}, false);

var lastTouchEnd = 0;
document.documentElement.addEventListener('touchend', function (event) {
  var now = (new Date()).getTime();
  if (now - lastTouchEnd <= 300) {
    event.preventDefault();
  }
  lastTouchEnd = now;
}, false);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
