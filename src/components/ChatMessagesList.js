import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import ChatMessage from './ChatMessage'
import ChatEvent from './ChatEvent'

const styles = theme => ({
  messagesWrapper: {
    overflowX: 'scroll',
    height: '100%',
    width: '100%',
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: 120,
  }
});

class ChatMessagesList extends React.Component {

  componentDidMount() {
    this.scrollDownHistory ();
  }

  componentDidUpdate() {
    this.scrollDownHistory ();
  }

  scrollDownHistory () {
    const messagesWrapper = this.refs.messagesWrapper;

    if (messagesWrapper) {
      messagesWrapper.scrollTop = messagesWrapper.scrollHeight;
    }
  }

  render () {
    const {messages, classes} = this.props;
    
    return (
      <div className={classes.messagesWrapper} ref="messagesWrapper">
          
        {messages && messages.map((message, index) => {
          return (
            <ChatMessage 
              {...message}
              key={index}
              when='a few seconds ago' 
            />
          )    
          }
        )}
      
      <Typography>
        <ChatEvent 
          event="joined" 
          author="Vasya" 
          colorA="primary" 
          when="a few seconds ago"
        />
      </Typography>

      </div>
    );
  }
}

export default withStyles (styles)(ChatMessagesList);
