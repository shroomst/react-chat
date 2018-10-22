import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';

const styles = {
  profileMenu: {
    display: "flex",
    justifyContent: 'flex-end',
    width: "100%",
  },
  loggedUser: {
    marginTop: 16,
  },
  menuBar: {
    top:50,
  }
};

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

  handleEditProfile = () => {
    this.handleClose();
    this.props.userInfoHandler('userInfoModal');
  }

  handleLogout = (event)=> {
    event.preventDefault();
    this.props.onLogout();
    this.handleClose();
  }

  render() {
    const { anchorEl } = this.state;
    const { classes, username } = this.props;

    return (
      <div className={classes.profileMenu}>
        <div className={classes.loggedUser}>
          {username}
        </div>
        <IconButton
          aria-owns={!!anchorEl ? 'menu-user' : null}
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="inherit"
        >
          <AccountCircle/>
        </IconButton>
        <Menu
          id="menu-user"
          className={classes.menuBar}
          anchorEl={this.anchorEl}
          open={!!anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          getContentAnchorEl={null}
        >
          <MenuItem onClick={this.handleEditProfile}>Edit Profile</MenuItem>
          <MenuItem onClick={this.handleLogout}>Log Out</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default withStyles(styles)(UserMenu);
