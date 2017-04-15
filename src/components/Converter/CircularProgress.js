import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import CircularProgressOriginal from 'material-ui/CircularProgress';

export default class CircularProgress extends Component {

  render() {
    const {
			icon
    } = this.props;

    return (
      <div>
				<div style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
					{icon}
				</div>
				<div style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
					<CircularProgressOriginal props={this.props} />
				</div>
      </div>
    );
  }
}
