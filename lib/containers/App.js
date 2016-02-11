import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
// import * as actions from '../actions.js';
import * as constants from '/lib/constants.js';
import Unit from '/lib/components/Unit.js';
import createDebug from 'debug';
const debug = createDebug('rs:app');

class App extends React.Component {
  static propTypes = {
    width: PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    height: PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    units: PropTypes.array
  };
  static defaultProps = {
    width: '100%',
    height: '100%',
    units: []
  }
  style = {
    width: '100%',
    height: '100%'
  }
  render() {
    const { width, height, units } = this.props;

    return (
      <svg style={this.style} xmlns="http://www.w3.org/svg/2000"
        width={width}
        height={height}
      >
        {units.map((unit, index) => (
          <Unit
            type={unit.type}
            numConn={unit.numConn}
            energy={unit.energy}
            key={`${unit.type}-${index}`}
          />
        ))}
     </svg>
    );
  }
}
// Map state to props
function select(state) {
  return {
    units: state.units
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(App);
