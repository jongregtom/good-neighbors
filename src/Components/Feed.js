import React, {useState, useEffect} from 'react';
import Request from './Request';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 2,
    height: '100%',
  },
  button: {
    margin: theme.spacing.unit,
    position: 'fixed',
    left: 75,
    top: 150,
  },
//   gridList: {
//     width: 800,
//     height: 800,
//   },
});

const Feed = function(props) {
    const [feed, setFeedValue] = useState([]);
    useEffect(() => {
        getRequests();
    }, [])

    const { classes } = props;

    const getRequests = () => {
        console.log('process.env.PORT: ', process.env.PORT)
        var query = `query {
            getRequests {
                id
                subject
                request
                location
                userId
                userName
                createdAt
            }
        }`;
        fetch(`http://localhost:${process.env.PORT || '8080'}/graphql`, {
          method: 'POST',
          headers: {
            'Content-Type':  'application/json',
            'Accept': 'application/json' 
          },
          body: JSON.stringify({
            query
          })
        })
        .then(r => r.json())
        .then(res => setFeedValue(res.data.getRequests))
    }

    return (
        <div className={classes.root}>
            <GridList cellHeight="auto"  cols={1} >
                {feed.map((request) => (
                    <GridListTile key={request.id} cols={1}>
                        <Request key={request.id} request={request} />
                    </GridListTile>
                ))}
            </GridList>
        </div>
        // <div className={classes.root}>
        //     <Button size="medium" className={classes.root}>Sort By Location</Button>
        //     <ul>
        //     {feed.map((request) => <Request key={request.id} request={request} />)}
        //     </ul>
        // </div>
    )
}

Feed.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Feed);