import React from 'react';

import MoreIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  userMenu: {
    top: 50,
    left: 400, // временный костыль, пока не разберусь в верстке.
  },
};

class ChatMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLeaveClick = () => {
    const { onLeaveClick } = this.props;
    this.handleClose();
    onLeaveClick();
  };

  handleDeleteClick = () => {
    const { onDeleteClick } = this.props;
    this.handleClose();
    onDeleteClick();
  };

  render() {
    const { anchorEl } = this.state;
    const { classes, disabled, activeUser } = this.props;

    if (!activeUser.isChatMember) {
      return null;
    }

    return (
      <React.Fragment>
        <IconButton
          aria-owns={anchorEl ? 'menu-chat' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
          disabled={disabled}
          color="inherit"
        >
          <MoreIcon />
        </IconButton>
        <Menu
          id="menu-chat"
          anchorEl={this.anchorEl}
          open={!!anchorEl}
          onClose={this.handleClose}
          className={classes.userMenu}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          getContentAnchorEl={null}
        >
          {activeUser.isMember && <MenuItem onClick={this.handleLeaveClick}>Leave</MenuItem>}
          {activeUser.isCreator && <MenuItem onClick={this.handleDeleteClick}>Delete</MenuItem>}
        </Menu>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(ChatMenu);
