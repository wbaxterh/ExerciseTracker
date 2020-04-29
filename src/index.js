import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import App from './App'; //where we create the files
// import * as serviceWorker from './serviceWorker';
//render app to the root of index.html
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//not using
//serviceWorker.unregister();
