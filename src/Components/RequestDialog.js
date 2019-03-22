import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Location from './Location';
import CreateRequest from './CreateRequest';
import DatePicker from 'material-ui/DatePicker';

/**
 * Dialogs can be nested. This example opens a Date Picker from within a Dialog.
 */
class RequestDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ];

    return (
      <div>
        <RaisedButton label="Enter Location for Best Results" onClick={this.handleOpen} />
        <Dialog
          title="Location"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <Location locationResult={this.props.locationResult} handleChange={this.props.handleChange} placesAutoComplete={this.props.placesAutoComplete} />
        </Dialog>
      </div>
    );
  }
}

export default RequestDialog;