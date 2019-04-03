import React, {useState} from 'react';
import LocationPopUp from './LocationPopUp';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 5,
    marginLeft: theme.spacing.unit * 10,
    marginRight: theme.spacing.unit * 10,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  textField: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit * 2,
  },
  input: {
    display: 'none',
  },
});

const CreateRequest = function(props) {
    const [subjectValue, setSubjectValue] = useState('');
    const [requestValue, setRequestValue] = useState('');
    const [locationValue, setLocationValue] = useState('');

    const handleLocationChange = (location) => {
      setLocationValue(location)
    }

    const handleLocationSet = (location) => {
      setLocationValue(location)
    }

    const { classes } = props;

    const handleSubmit = (e) => {
        e.preventDefault();
        (props.user) ? addRequest() : alert('Please sign in to submit a request.');
        props.history.push('/')
    }
 
    const addRequest = () => {
        let subject = subjectValue, request = requestValue, location = locationValue, userId = (props.user) ? props.user.sub : null;
        var query = `mutation addRequest($input: RequestInput) {
          addRequest(input: $input) {
            id
            subject
            request
            location
            userId
          }
        }`;
        
        fetch(`/graphql`, {
          method: 'POST',
          headers: {
            'Content-Type':  'application/json',
            'Accept': 'application/json' 
          },
          body: JSON.stringify({
            query,
            variables: {
              input: {
                subject,
                request,
                location,
                userId
              }
            }
          })
        })
          .then(r => r.json())
          .then(res => console.log('data returned', res))
    }

    return (
      <div>  
        <Paper className={classes.root} elevation={10}>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            required
            id="filled-name"
            label="Subject"
            value={subjectValue}
            onChange={(e) => {setSubjectValue(e.target.value)}}
            className={classes.textField}
            margin="normal"
            helperText="Enter a short Description"
            variant="outlined"
          />
        </form>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="filled-multiline-static"
            label="Enter Details Here"
            multiline
            rows="4"
            rowsMax="10"
            value={requestValue}
            onChange={(e) => {setRequestValue(e.target.value)}}
            className={classes.textField}
            margin="normal"
            helperText="Be as detailed as possible here"
            variant="outlined"
          />
        </form>
        <LocationPopUp className={classes.container} locationValue={locationValue} handleLocationChange={handleLocationChange} handleLocationSet={handleLocationSet} locationButtonDialog={"Enter Location for Best Results"}/>
        <div style={{display: 'flex', justifyContent: 'center'}}>
        <Button variant="contained" color="primary" className={classes.button} onClick={handleSubmit} to="/" >
          Submit
        </Button>
        </div>
        </Paper>
      </div>
    )
}

CreateRequest.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateRequest);