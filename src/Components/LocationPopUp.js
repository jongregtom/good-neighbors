import React, {useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Location from './Location';

const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2,
    width: 400,
    height: 280,
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit,
  },
}))(MuiDialogActions);

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
      <div style={{display: 'flex', justifyContent: 'center', marginTop: 18}}>
        <Button variant="outlined" color="primary" onClick={handleOpen}>{(props.locationValue === '') ? "Add Location for Best Results" : props.locationValue}</Button>
        <Dialog
          aria-labelledby="form-dialog-title"
          open={openValue}
          onClose={handleCancel}
        >
        <DialogTitle>Location:</DialogTitle>
        <DialogContent>
            <Location id="form-dialog-title" locationValue={props.locationValue} handleLocationChange={props.handleLocationChange} handleLocationSet={props.handleLocationSet}/>
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