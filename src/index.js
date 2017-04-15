import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import 'reset-css/reset.css';
import App from './App';

injectTapEventPlugin();

ReactDOM.render(<App />, document.getElementById('root'));
