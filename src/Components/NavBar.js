import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';
import auth0Client from '../Auth';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
})

const styles = theme => ({
  root: {
    flexGrow: 1,
    display: 'flex'
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  button: {
    position: 'relative',
    marginLeft: 0,
  },
});

const drawerWidth = 240;


const NavBar = function(props) {

    const[openValue, setOpenValue] = useState(false);

    const handleDrawerOpen = () => {
        setOpenValue(true);
    };
    
    const handleDrawerClose = () => {
        setOpenValue(false);
    };

    const handleClick = (route) => {
        handleDrawerClose();
        props.history.push(route);
    }

    const signOut = () => {
        auth0Client.signOut();
        props.history.replace('/');
    };

    const { classes } = props;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar 
                position="fixed"
                className={classNames(classes.appBar, {
                    [classes.appBarShift]: openValue,
              })}
            >
                <Toolbar disableGutters={!openValue}>
                    <IconButton 
                        className={classNames(classes.menuButton, openValue && classes.hide)} 
                        color="inherit" 
                        aria-label="Open drawer"
                        onClick={handleDrawerOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h5" color="inherit" noWrap className={classes.root}>
                        Good Neighbors
                    </Typography>
                    {
                        !auth0Client.isAuthenticated() &&
                        <Button className={classes.button} color="inherit" onClick={auth0Client.signIn}>Login</Button>
                    }
                    {
                        auth0Client.isAuthenticated() &&
                        <div>
                            <Button className={classes.button} color="inherit" onClick={() => {signOut()}}>Logout</Button>
                        </div>
                    }
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={openValue}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
            <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </div>
            <Divider />
            <List>
                <ListItem button key={0} onClick={() => {handleClick('/')}}>
                    <ListItemIcon>{<InboxIcon />}</ListItemIcon>
                    <ListItemText primary={'Home'}/>
                </ListItem>
                <ListItem button key={1} onClick={() => {handleClick('/CreateRequest')}}>
                    <ListItemIcon>{<InboxIcon />}</ListItemIcon>
                    <ListItemText primary={'Make a Request'}/>
                </ListItem>
            </List>
            <Divider />
            </Drawer>
            <main
                className={classNames(classes.content, {
                    [classes.contentShift]: openValue,
                })}
            >
            <div className={classes.drawerHeader} />
            </main>
        </div>
    );
  }

  NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withRouter((withStyles(styles)(NavBar)));
  