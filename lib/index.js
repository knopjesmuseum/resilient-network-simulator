import 'systemjs-hot-reloader/default-listener.js';
import React from 'react';
// import { bindActionCreators } from 'redux';
import ReactDOM, { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store.js';
import reducer from './reducers/index.js';
// import * as actions from './actions.js';
// import DevTools from './DevTools.js';
import App from './containers/App.js';
// import * as constants from '/lib/constants.js';
import createDebug from 'debug';
const debug = createDebug('rs:index');

debug('index');

const store = configureStore(reducer);

let prevState = store.getState();
debug('initial state: ', store.getState());
const unsubscribe = store.subscribe(() => {
  const state = store.getState();
  if (state !== prevState) {
    debug('state: ', state);
    prevState = state;
  }
});

// const boundActions = window.actions = bindActionCreators(actions, store.dispatch);
//
// for (let unitType in constants.NUM_UNITS) {
//   const numPerType = constants.NUM_UNITS[unitType];
//   for (let i = 0; i < numPerType; i++) {
//     boundActions.addUnit(unitType, constants.NUM_CONN);
//   }
// }

const container = document.getElementById('app');
render(
  <Provider store={store}>
      <App />
  </Provider>,
  container
);

export function __unload() {
  if (unsubscribe) unsubscribe();
  ReactDOM.unmountComponentAtNode(container);
}
