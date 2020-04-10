import React from 'react';
import ReactDOM from 'react-dom';
import Heads from './header.js'
import MainContent from './content.js'

ReactDOM.render(
  <div className="body">
  <Heads/>
  <MainContent/>
  </div>,
  document.getElementById('root')
);
