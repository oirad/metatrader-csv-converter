import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ActionInfo from 'material-ui/svg-icons/action/info';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import FileDownload from 'material-ui/svg-icons/file/file-download';

export default class Converter extends Component {

  constructor(props) {
		super(props);
		this.state = {
			files: props.files
    };
	}

  renderFiles() {
    return this.state.files.map((file, iterator) => {
      return (
      	<ListItem
					key={iterator}
      	  leftAvatar={<Avatar icon={<ActionAssignment />} />}
					rightIcon={<FileDownload />}
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
