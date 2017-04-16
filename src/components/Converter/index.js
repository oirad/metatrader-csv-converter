import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ActionInfo from 'material-ui/svg-icons/action/info';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import FileDownload from 'material-ui/svg-icons/file/file-download';
import IconButton from 'material-ui/IconButton';
import CircularProgress from './CircularProgress';

import ConvertWorker from 'worker-loader!../../utils/ConvertWorker';

export default class Converter extends Component {

  constructor(props) {
		super(props);
		this.state = {
			files: props.files,
      results: []
    };
    this.state.files.forEach((file, index) => {
      this.state.results.push({ value: 0, href: null });
    });
    this.doConversion();
	}

  doConversion() {
    this.state.files.forEach((file, index) => {
     	const worker = new ConvertWorker();

     	worker.onmessage = (event) => {
     	  const message = event.data;
        if (message.type === 'error') {
          console.log(message);
        }
		 		if (message.data) {
		 			const results = this.state.results;
		 			results[index] = message.data;
		 			this.setState({ results });
				}
     	  if (message.type === 'done!') {
     	  	worker.terminate();
     	  }
     	}

      worker.postMessage({ type: 'start', data: { source: file, outputType: this.props.outputType } });
    });
  }

  renderFiles() {
    return this.state.files.map((file, iterator) => {
      return (
      	<ListItem
          href={this.state.results[iterator].href}
					key={iterator}
      	  leftAvatar={<Avatar icon={<CircularProgress value={this.state.results[iterator].value || 0} icon={<ActionAssignment style={{ height: '40px', width: '40px'}} />} />} backgroundColor="transparent" size={40}/>}
					rightIcon={<Avatar icon={<IconButton style={{ padding: 0, margin: 0 }} disabled={!this.state.results[iterator].href}><FileDownload /></IconButton>} backgroundColor="transparent" />}
      	  primaryText={file.name}
      	/>
      );
    });
  }

  render() {
    return (
      <List>
        {this.renderFiles()}
      </List>
    );
  }
}
