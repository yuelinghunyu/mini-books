import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import "mso-flex/mso-flex";
import "../static/fonts/iconfont.scss";
import initReactFastclick from 'react-fastclick';

initReactFastclick();

ReactDOM.render(<App />,document.getElementById("root"))