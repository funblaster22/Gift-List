import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  // <React.StrictMode> causes wierd double-firing of setState function
  // (eg GridItem:markCompleted). See https://stackoverflow.com/questions/50819162/why-is-my-function-being-called-twice-in-react
  <React.StrictMode>
    <App />
  </React.StrictMode>
  ,document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
