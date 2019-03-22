import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import auth0Client from '../Auth';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};


function NavBar(props) {
    const signOut = () => {
        auth0Client.signOut();
        props.history.replace('/');
    };
    const { classes } = props;
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        Menu
                    </Typography>
                    {
                        !auth0Client.isAuthenticated() &&
                        <Button color="inherit" onClick={auth0Client.signIn}>Login</Button>
                    }
                    {
                        auth0Client.isAuthenticated() &&
                        <div>
                            <Button color="inherit" onClick={() => {signOut()}}>Logout</Button>
                        </div>
                    }
                </Toolbar>
            </AppBar>
        </div>
        // <div>
        // <Link className="navbar-brand" to="/">
        //     Home
        // </Link>
        // {
        //     !auth0Client.isAuthenticated() &&
        //     <button className="btn btn-dark" onClick={auth0Client.signIn}>Sign In</button>
        // }
        // {
        //     auth0Client.isAuthenticated() &&
        //     <div>
        //         <button className="btn btn-dark" onClick={() => {signOut()}}>Sign Out</button>
        //     </div>
        // }
        // </div>
    );
  }

  NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withRouter((withStyles(styles)(NavBar)));
  