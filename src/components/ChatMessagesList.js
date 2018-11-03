import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import ChatMessage from './ChatMessage';

const styles = theme => ({
  messagesWrapper: {
    overflowY: 'scroll',
    height: '100%',
    width: '100%',
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: 120,
  },
  paper: {
    padding: theme.spacing.unit * 3,
  },
});

class ChatMessagesList extends React.Component {
  static propTypes = {
    messages: PropTypes.arrayOf(PropTypes.shape({
      chatId: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      sender: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        username: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
      }).isRequired,
      createdAt: PropTypes.string.isRequired,
    })).isRequired,
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    match: PropTypes.shape({
      params: PropTypes.object.isRequired,
    }).isRequired,
    activeUser: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      username: PropTypes.string,
      isMember: PropTypes.bool.isRequired,
      isCreator: PropTypes.bool.isRequired,
      isChatMember: PropTypes.bool.isRequired,
    }).isRequired,
  }

  constructor() {
    super();
    this.scrollRef = React.createRef();
  }

  componentDidMount() {
    this.scrollDownHistory();
  }

  componentDidUpdate() {
    this.scrollDownHistory();
  }

  scrollDownHistory() {
    const { messagesWrapper } = this.scrollRef;

    if (messagesWrapper) {
      messagesWrapper.scrollTop = messagesWrapper.scrollHeight;
    }
  }

  render() {
    const {
      messages, classes, match, activeUser,
    } = this.props;

    // If there's no active chat, then show a tip
    if (!match.params.chatId) {
      return (
        <Paper className={classes.paper}>
          <Typography variant="h4" gutterBottom>
            Start messaging…
          </Typography>
          <Typography variant="body2" gutterBottom>
            Use
            {' '}
            <strong>Explore</strong>
            {' '}
to explore chats around here.
          </Typography>
          <Typography variant="body2" gutterBottom>
            Use
            {' '}
            <strong>MyChats</strong>
            {' '}
to see your own chats.
          </Typography>
        </Paper>
      );
    }

    return messages && messages.length ? (
      <div className={classes.messagesWrapper} ref={this.scrollRef}>
        {messages.map(message => (
          <ChatMessage
            {...message}
            /* eslint-disable no-underscore-dangle */
            key={message._id}
            /* eslint-enable no-underscore-dangle */
            activeUser={activeUser}
          />
        ))}
      </div>
    ) : (
      <Typography variant="h4">No messages yet...</Typography>
    );
  }
}

export default withRouter(withStyles(styles)(ChatMessagesList));
