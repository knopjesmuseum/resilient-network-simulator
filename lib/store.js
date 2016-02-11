import { createStore, applyMiddleware, compose } from 'redux';
// import DevTools from './DevTools.js';
import createLogger from 'redux-logger';
// import createDebug from 'debug';
// const debug = createDebug('rs:store');
import getHotReloadStore from './utils/getHotReloadStore.js';
const hotStore = getHotReloadStore('rs:store');

const logger = createLogger({
  collapsed: true,
  logErrors: false
});
const middleware = [
  logger
];

const enhancer = compose(
  applyMiddleware(...middleware)
  // DevTools.instrument()
);

export default function configureStore(reducer) {
  let initialState;
  if (hotStore.store) initialState = hotStore.store.getState();
  const store = createStore(reducer, initialState, enhancer);
  hotStore.store = store;
  return store;
}
