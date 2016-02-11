export const INIT = 'INIT';
export const ADD_UNIT = 'ADD_UNIT';

export function init() {
  return { type: INIT };
}
export function addUnit(unitType, numConn) {
  return { type: ADD_UNIT, unitType, numConn };
}
