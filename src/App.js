import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { muiTheme } from './muiTheme';

import Header from './components/Header';
import Steps from './components/Steps';
import Footer from './components/Footer';

import './global.scss';

export default class App extends Component {
  render() {
    let inner = <Steps />;
    if (typeof window.chrome == 'undefined') {
      inner = (
        <div className="center">
          <h2>Browser not supported, please use Google Chrome</h2>
          <a href="https://www.google.com/chrome/browser/desktop/index.html" target="_blank">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="15.5 15.5 224.5 224.5">
              <defs>
                <radialGradient cy="0" cx="0.5" id="r">
                 <stop stopColor="#f06b59"/>
                 <stop offset="1" stopColor="#df2227"/>
                </radialGradient>
                <radialGradient r="0.76" cy="0.3" cx="0.65" id="g">
                 <stop offset="0.65" stopColor="#4cb749"/>
                 <stop offset="1" stopColor="#388b41"/>
                </radialGradient>
                <radialGradient r="0.8" cy="0.25" cx="0.36" id="y">
                 <stop offset="0.6" stopColor="#FCD209"/>
                 <stop offset="0.7" stopColor="#f7c616"/>
                 <stop offset="1" stopColor="#bc821e"/>
                </radialGradient>
                <radialGradient r="1" cy="0" cx="0.5" spreadMethod="pad" id="cf">
                 <stop offset="0.1" stopColor="#7FB3DF"/>
                 <stop offset="0.9" stopColor="#0F5B94"/>
                </radialGradient>
                <radialGradient id="cb" r="1" cy="0" cx="0.5">
                 <stop offset="0" stopColor="#F6F0EE"/>
                 <stop offset="1" stopColor="#ddd"/>
                </radialGradient>
              </defs>
              <path d="m198,148a70,70 0 0 0 -140,0l20,0a50,50 0 0 1 100,0" fillOpacity="0.1"/>
              <circle r="45" cx="127.5" cy="127.6" fill="url(#cf)" stroke="url(#cb)" strokeWidth="9" />
              <path d="m228,78a112,112 0 0 0 -193,-13l45,78a50,50 0 0 1 47,-65" fill="url(#r)"/>
              <path d="m35,65a112,112 0 0 0 84,174l47,-80a50,50 0 0 1 -86,-16" fill="url(#g)"/>
              <path d="m119,239a112,112 0 0 0 109,-161l-101,0a50,50 0 0 1 39,81" fill="url(#y)"/>
              <path d="m35,65l45,78a50,50 0 0 1 2,-34l-45,-47" opacity="0.075"/>
              <path d="m119,239l47,-80a50,50 0 0 1 -29,17l-20,63" opacity="0.05"/>
              <path d="m228,78l-101,0a50,50 0 0 1 39,19l64,-16" opacity="0.05"/>
            </svg>
          </a>
        </div>
      );
    }
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="main">
          {inner}
        </div>
      </MuiThemeProvider>
    );
  }
}
