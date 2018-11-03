import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';

import Avatar from './Avatar';

const styles = theme => ({
  activeChat: {
    backgroundColor: theme.palette.grey[200],
  },
});

const ChatListItem = ({
  classes, title, updatedAt, chatId, active, disabled,
}) => (
  <ListItem
    key={chatId}
    button
    component={Link}
    to={`/chat/${chatId}`}
    className={active ? classes.activeChat : ''}
    disabled={disabled}
  >
    <Avatar colorFrom={chatId}>{title}</Avatar>
    <ListItemText primary={title} secondary={<Moment fromNow>{updatedAt}</Moment>} />
  </ListItem>
);

ChatListItem.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  chatId: PropTypes.string.isRequired,
  active: PropTypes.bool,
  disabled: PropTypes.bool.isRequired,
};

ChatListItem.defaultProps = {
  active: null,
};

export default withStyles(styles)(ChatListItem);
