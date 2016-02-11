import * as actions from '/lib/actions.js';
import unitReducer from './unitReducer.js';
import update from 'react-addons-update';
import * as constants from '/lib/constants.js';
import createDebug from 'debug';
const debug = createDebug('rs:reducer');

export default function reducer(state, action) {
  debug('action: ', action);

  if (state === undefined) {
    state = {
      units: []
    };
    for (let unitType in constants.NUM_UNITS) {
      const numPerType = constants.NUM_UNITS[unitType];
      for (let i = 0; i < numPerType; i++) {
        const subAction = actions.addUnit(unitType, constants.NUM_CONN);
        state.units.push(unitReducer(undefined, subAction));
      }
    }
  }

  switch (action.type) {
    case actions.ADD_UNIT: {
      const unit = unitReducer(undefined, action);
      return update(state, {
        units: { $push: [unit] }
      });
    }
    default:
      return state;
  }
}
