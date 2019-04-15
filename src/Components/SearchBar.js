import React, {useEffect} from 'react';
import Location from './Location';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    display: 'flex',
    position: 'fixed',
    marginLeft: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 6,
    justifyContent: 'space-around',
  },
  location: {
    top: 0,
  },
  chip: {
    position: 'absolute',
    top: 40,
  },
});


const SearchBar = function(props) {
    const { classes } = props;
    let locationDisplayStatus;

    function handleDelete() {
        props.handleLocationChange('');
        props.handleLocationSet('');
    }

    !props.locationSearch ? locationDisplayStatus = 'none' : locationDisplayStatus = '';

    useEffect(() => {
    }, [props.locationSearch])

    return (
        <div className={classes.root}>
            <Grid container className={classes.location}>
                <Grid item>
                    <Location placeHolder={props.placeHolder} locationValue={props.locationValue} handleLocationChange={props.handleLocationChange} handleLocationSet={props.handleLocationSet}/>
                </Grid>
            </Grid>

            <Grid container className={classes.chip} style={{display: locationDisplayStatus}}>
                <Grid item>
                        <Chip
                        label={props.locationSearch}
                        onDelete={handleDelete}
                        className={classes.chip}
                        color="primary"
                    />
                </Grid>
            </Grid>
        </div>
    );
}

SearchBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchBar);