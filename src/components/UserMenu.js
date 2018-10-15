import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  profileMenu: {
    display: "flex",
    justifyContent: 'flex-end',
    width: "100%",
  },
  menuBar: {
    top: 50,
  }
});

class UserMenu extends React.Component {

  state = {
    anchorEl: null,
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const { classes } = this.props;
    return (
      <div className={classes.profileMenu}>
        <IconButton
          aria-owns={open ? 'menu-appbar' : null}
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          className={classes.menuBar}
          anchorEl={this.anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          getContentAnchorEl={null}
          open={open}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>Edit Profile</MenuItem>
          <MenuItem onClick={this.handleClose}>Log Out</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default withStyles (styles)(UserMenu);
