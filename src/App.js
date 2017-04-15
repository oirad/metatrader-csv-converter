import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { muiTheme } from './muiTheme';

import Header from './components/Header';
import Footer from './components/Footer';

import './global.scss';

export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="main">
          <Header />

          <Footer />
        </div>
      </MuiThemeProvider>
    );
  }
}
