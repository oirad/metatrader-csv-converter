import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ActionInfo from 'material-ui/svg-icons/action/info';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import FileDownload from 'material-ui/svg-icons/file/file-download';
import IconButton from 'material-ui/IconButton';
import CircularProgress from './CircularProgress';
import Convert from '../../utils/Convert';

export default class Converter extends Component {

  constructor(props) {
		super(props);
		this.state = {
			files: props.files
    };
    this.doConversion();
	}

  doConversion() {
    this.state.files.forEach((file) => {
      new Convert(file, this.props.outputType);
    });
  }

  renderFiles() {
    return this.state.files.map((file, iterator) => {
      return (
      	<ListItem
					key={iterator}
      	  leftAvatar={<Avatar icon={<CircularProgress value={file.value || 0} icon={<ActionAssignment style={{ height: '40px', width: '40px'}} />} />} backgroundColor="transparent" size={40}/>}
					rightIcon={<Avatar icon={<IconButton style={{ padding: 0, margin: 0 }}><FileDownload /></IconButton>} backgroundColor="transparent" />}
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
