import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Location from './Location';

const LocationPopUp = function(props) {
  const [openValue, setOpenValue] = useState(false);


  let handleOpen = () => {
    setOpenValue(true);
  };

  let handleSubmit = () => {
    setOpenValue(false);
  };

  let handleCancel = () => {
    props.handleLocationSet('')
    setOpenValue(false);
  };

    // const actions = [
    //   <Button
    //     label="Ok"
    //     primary={true}
    //     keyboardFocused={true}
    //     onClick={this.handleClose}
    //   />,
    // ];

    return (
      <div>
        <Button variant="outlined" color="primary" onClick={handleOpen}>{(props.locationValue === '') ? "Add Location for Best Results" : props.locationValue}</Button>
        <Dialog
          aria-labelledby="form-dialog-title"
          open={openValue}
          onClose={handleCancel}
        >
        <DialogTitle id="form-dialog-title">Location</DialogTitle>
        <DialogContent>
            <Location locationValue={props.locationValue} handleLocationChange={props.handleLocationChange} handleLocationSet={props.handleLocationSet}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

export default LocationPopUp;