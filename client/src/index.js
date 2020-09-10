import React from 'react';
import ReactDOM from 'react-dom';
// for redux
import store from './store';
import { Provider } from 'react-redux';

//for react router dom
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
