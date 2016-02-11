import * as actions from '/lib/actions.js';
import update from 'react-addons-update';
import { UNIT_TYPES } from '/lib/constants.js';
import createDebug from 'debug';
const debug = createDebug('rs:reducers:unit');

const initialState = {
  type: '',
  numConn: 0,
  energy: 0,
  x: 0,
  y: 0
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.ADD_UNIT: {
      debug('add: ', action);
      const energy = (action.unitType === UNIT_TYPES.PRODUCER) ? 1 : 0;
      return update(state, {
        type: { $set: action.unitType },
        numConn: { $set: action.numConn },
        energy: { $set: energy }
      });
    }
    default:
      return state;
  }
}
