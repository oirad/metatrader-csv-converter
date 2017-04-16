import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Dropzone from 'react-dropzone';
import {
  Step,
  Stepper,
  StepButton,
} from 'material-ui/Stepper';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ActionInfo from 'material-ui/svg-icons/action/info';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';

import Converter from '../Converter';

import './style.scss';

export default class Steps extends Component {

  /**
   * Override the constructor to set initial state
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      finished: false,
      stepIndex: 0,
      outputType: 'ctrader',
      files: []
    };
  }

  /**
   * Dummy async function to display changes of steps smoother
   *
   * @param {Function} cb
   */
  dummyAsync(cb) {
    this.setState({loading: true}, () => {
      this.asyncTimer = setTimeout(cb, 500);
    });
  }

  /**
   * Handles the change of step to the next
   *
   */
  handleNext() {
    const {stepIndex} = this.state;
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 1,
      }));
    }
  }

  /**
   * Handles the change of step to the previous
   *
   */
  handlePrev() {
    const {stepIndex} = this.state;
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex - 1,
      }));
    }
  }

  /**
   * Handles the change of step to a specific index
   *
   * @param {Number} stepIndex
   */
  handleGoto(stepIndex) {
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        finished: false,
        stepIndex
      }));
    }
  }

  /**
   * Handles the upload of files
   *
   * @param {Array} acceptedFiles
   * @param {Array} rejectedFiles
   *
   */
  handleDrop(acceptedFiles, rejectedFiles) {
    this.setState({ files: acceptedFiles });
  }

  /**
   * Renders the list of files
   *
   * @return {String}
   */
  renderFiles() {
    return this.state.files.map((file, iterator) => {
      return (
      	<ListItem
					key={iterator}
      	  leftAvatar={<Avatar icon={<ActionAssignment />} />}
      	  primaryText={file.name}
      	/>
      );
    });
  }

  /**
   * Renders the contents of a Step
   *
   * @return {String}
   */
  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <div>
            <Subheader>
              Add the Metatrader source files below
            </Subheader>
            <Dropzone
              onDrop={(acceptedFiles, rejectedFiles) => this.handleDrop(acceptedFiles, rejectedFiles)}
              accept="text/csv, application/zip"
              className="drop-zone">
              <p className="center">
                Click or drop here to select the source file in metatrader format.
              </p>
              <p className="center">
                The supported files are in Metatrader CSV format.
              </p>
              <p className="center">
                You can select both CSV files directly or ZIP files containing one CSV.
              </p>
              <List>
                {this.renderFiles()}
              </List>
            </Dropzone>
          </div>
        );
      case 1:
        return (
          <div>
            <Subheader>
              Select a target from the list below
            </Subheader>
            <DropDownMenu value={this.state.outputType} onChange={(event, index, value) => this.setState({ outputType: value })}>
              <MenuItem value="ctrader" primaryText="cTrader" />
            </DropDownMenu>
          </div>
        );
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  /**
   * Renders the content taking care of the case in which the experience is finished
   *
   * @return {String}
   */
  renderContent() {
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px', overflow: 'hidden'};

    if (finished) {
      return (
				<div>
					<h2 className="center">Exporting files in {this.state.outputType} format</h2>
        	<Converter files={this.state.files} outputType={this.state.outputType} />
				</div>
      );
    }

    return (
      <div style={contentStyle}>
        <div>{this.getStepContent(stepIndex)}</div>
        <div style={{ marginTop: 24, marginBottom: 12, float: 'right' }}>
          <RaisedButton
            label={stepIndex === 1 ? 'Finish' : 'Next'}
            primary={true}
            onTouchTap={() => { this.handleNext() }}
            disabled={this.state.files.length === 0}
          />
        </div>
      </div>
    );
  }

  render() {
    const {loading, stepIndex} = this.state;

    return (
      <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepButton onClick={() => this.handleGoto(0)}>
              Select Source File
            </StepButton>
          </Step>
          <Step>
            <StepButton onClick={() => this.handleGoto(1)}>
              Select Output Type
            </StepButton>
          </Step>
        </Stepper>
        <ExpandTransition loading={loading} open={true}>
          {this.renderContent()}
        </ExpandTransition>
      </div>
    );
  }
}
