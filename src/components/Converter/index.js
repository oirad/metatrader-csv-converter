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

import './style.scss';

export default class Converter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      finished: false,
      stepIndex: 0,
      file: null
    };
  }

  dummyAsync(cb) {
    this.setState({loading: true}, () => {
      this.asyncTimer = setTimeout(cb, 500);
    });
  }

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

  handlePrev() {
    const {stepIndex} = this.state;
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex - 1,
      }));
    }
  }

  handleGoto(stepIndex) {
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        finished: false,
        stepIndex
      }));
    }
  }

  handleDrop(files) {
    this.setState({ file: files[0] });
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <div>
            <Subheader>
              Select a source from the list below
            </Subheader>
            <Dropzone
              onDrop={this.handleDrop}
              multiple={false}
              accept="ext/csv, application/zip"
              className="drop-zone">
              <p className="center">
                Click or drop here to select the source file in metatrader format.
              </p>
              <p className="center">
                The supported files are in CSV format.
              </p>
            </Dropzone>
          </div>
        );
      case 1:
        return (
          <div>

          </div>
        );
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  renderContent() {
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px', overflow: 'hidden'};

    if (finished) {
      return (
        <div style={contentStyle}>
          <p>
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                this.setState({ stepIndex: 0, finished: false});
              }}
            >
              Click here
            </a> to download the converted data.
          </p>
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
