import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    display: 'flex',
    position: 'fixed',
    marginLeft: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
  },
});

const SearchBar = function(props) {
    const [openValue, setOpenValue] = useState(false);

    const handleToggle = () => {
        setOpenValue(!openValue)
    };
    let anchorEl;

    const handleClose = event => {
        if (anchorEl.contains(event.target)) {
            return;
        }

        setOpenValue(false);
    };

    const { classes } = props;
    const open = openValue;

    return (
        <div className={classes.root}>
        <div>
            <Button
                buttonRef={node => {
                    anchorEl = node;
                }}
                aria-owns={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
            >
            Search By...(under construction)
            </Button>
            <Popper open={open} anchorEl={anchorEl} transition disablePortal>
            {({ TransitionProps, placement }) => (
                <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                    <MenuList>
                        <MenuItem onClick={handleClose}>KeyWord</MenuItem>
                        <MenuItem onClick={handleClose}>User</MenuItem>
                        <MenuItem onClick={handleClose}>Location</MenuItem>
                    </MenuList>
                    </ClickAwayListener>
                </Paper>
                </Grow>
            )}
            </Popper>
        </div>
        </div>
    );
}

SearchBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchBar);