import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

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
  state = {
    value: ''
  }

  handleValueChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  }

  handleKeyPress = (event) => {
    const { value } = this.state;
    if (event.key === 'Enter' && value) {
      this.props.sendMessage(value);
      this.setState({
        value: ''
      });
    }
  }

  render () {
    const { classes, showJoinButton, onJoinButtonClick } = this.props;

    return (
      <div className={classes.messageInputWrapper}>
        <Paper className={classes.inputMessage}  elevation={5}>
          {showJoinButton 
            ? (
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={onJoinButtonClick}
              >
                Join Chat
              </Button>
            )
            : (
              <Input 
                placeholder="Type your message..."
                fullWidth
                value={this.state.value}
                onChange={this.handleValueChange}
                onKeyPress={this.handleKeyPress}
              />
            )
             }
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(InputMessage);
