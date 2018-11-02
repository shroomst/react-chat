import React from 'react';
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
  componentDidMount() {
    this.scrollDownHistory();
  }

  componentDidUpdate() {
    this.scrollDownHistory();
  }

  constuctor() {
    super();
    this.scrollRef = React.createRef();
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
