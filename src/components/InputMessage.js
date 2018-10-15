import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';

const drawerWidth = 320;

const styles = theme => ({
  messageInputWrapper: {
    height:75,
    width: `calc(100% - ${drawerWidth+50}px)`,
    position: "fixed",
    bottom: 0
  },
  inputMessage : {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },

});

class InputMessage extends React.Component {
  render () {
    const { classes } = this.props;

    return (
      <div className={classes.messageInputWrapper}>
        <Paper className={classes.inputMessage}  elevation={5}>
          <Input 
            placeholder="Type your message..."
            className={classes.input}
            fullWidth
          />
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(InputMessage);
