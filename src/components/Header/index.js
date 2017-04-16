import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AppBar from 'material-ui/AppBar';

export default class Header extends Component {
  render() {
    return (
      <AppBar className="center" title="Metatrader CSV Converter" showMenuIconButton={false} />
    );
  }
}
