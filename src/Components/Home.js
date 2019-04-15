import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Feed from './Feed';
import SearchBar from './SearchBar';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    searchBar: {
        height: '100%',
    }
});


const Home = function(props) {
    const [locationValue, setLocationValue] = useState('');
    const [locationSearch, setLocationSearch] = useState('');

    const handleLocationChange = (location) => {
        setLocationValue(location)
    }
  
    const handleLocationSet = (location) => {
        setLocationSearch(location);
        setLocationValue('');
    }

    const { classes } = props;

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item className={classes.searchBar}>
                    <SearchBar placeHolder={'Search By Location...'} locationSearch={locationSearch} locationValue={locationValue} handleLocationChange={handleLocationChange} handleLocationSet={handleLocationSet} />
                </Grid>
            </Grid>
            <Grid container>
                <Grid item>
                    <Feed location={locationSearch} />
                </Grid>
            </Grid>
        </div>
    )
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);