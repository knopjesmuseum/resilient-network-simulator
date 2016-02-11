import React from 'react';
import Draggable from './Draggable.js';
import createDebug from 'debug';
const debug = createDebug('rs:comp:unit');

const COLOR = '#ebc629';
const RADIUS = 30;
const CONN_RADIUS = 7;

const Unit = ({ type, numConn = 0, energy = 0 }) => {
  const conns = [];
  for (let i = 0; i < numConn; i++) {
    let angle = 360 / numConn * i;
    angle *= Math.PI / 180; // Convert to radians
    const rotatedX = Math.cos(angle) - Math.sin(angle) * RADIUS;
    const rotatedY = Math.sin(angle) + Math.cos(angle) * RADIUS;
    conns.push(<circle
      r={CONN_RADIUS}
      fill="#ffffff"
      stroke={COLOR}
      strokeWidth={2}
      key={i}
      cx={rotatedX}
      cy={rotatedY}
    />);
  }
  return (
    <Draggable>
      <circle
        r={RADIUS}
        fill={COLOR}
        fillOpacity={energy}
        stroke={COLOR}
        strokeWidth={2}
      />
      {conns}
    </Draggable>
  );
};

export default Unit;
