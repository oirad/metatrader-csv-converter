import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import CircularProgressOriginal from 'material-ui/CircularProgress';
import { yellowA700 } from 'material-ui/styles/colors';

export default class CircularProgress extends Component {

  render() {
    const {
      value,
			icon
    } = this.props;

    return (
      <div>
				<div style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
					{icon}
				</div>
				<div style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
					<CircularProgressOriginal color={yellowA700} innerStyle={{ margin: 0 }} value={value} mode="determinate" />
				</div>
      </div>
    );
  }
}
