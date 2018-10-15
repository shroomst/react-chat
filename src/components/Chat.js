import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import InputMessage from './InputMessage'
import ChatMessagesList from './ChatMessagesList'

const styles = theme => ({
  chatLayout: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 64,
    height: "100%",
    overflow: "hidden",
  },
});

const Chat = ({classes, messages}) => (

      <main className={classes.chatLayout}>
        
        <ChatMessagesList messages={messages} />

        <InputMessage/>

      </main>
    );

export default withStyles (styles)(Chat)
