import React, { PropTypes } from 'react';
import createDebug from 'debug';
const debug = createDebug('rs:comp:draggable');

const LEFT_BUTTON = 0;

// NOTE: Drag and drop in React:
// http://kentwilliam.com/articles/rich-drag-and-drop-in-react-js

export default class Draggable extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    onDrop: PropTypes.func
  }
  static defaultProps = {}
  state = {
    x: 100,
    y: 100
  }
  onMouseDown = (event) => {
    if (event.button !== LEFT_BUTTON) return;
    event.stopPropagation();
    this.addEvents();
  };
  onMouseMove = (event) => {
    const x = event.pageX;
    const y = event.pageY;
    this.setState({ x, y });
  }
  onMouseUp = () => {
    const { x, y } = this.state;
    this.removeEvents();
    // TODO: emit dragEnd with position
    if (this.props.onDrop) this.props.onDrop(x, y);
  }
  addEvents = () => {
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  };
  removeEvents = () => {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  };
  render() {
    const { children } = this.props;
    const { x, y } = this.state;
    return (
      <g
        ref="g"
        onMouseDown={this.onMouseDown}
        transform={`translate(${x}, ${y})`}
      >
        { children }
      </g>
    );
  }
}
