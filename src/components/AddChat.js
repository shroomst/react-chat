import React from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  form: {
    width      : '100%', // Fix IE11 issue.
    marginTop  : theme.spacing.unit,
    height     : 120,
  },
});

class AddChat extends React.Component {
  state = {
    chatName: {
      value: '',
      isValid: true,
    }
  }

  validate() {
    const { chatName } = this.state;
    const isValid = (/^[A-Za-z0-9а-яА-Я -.?!]+$/.test(chatName.value)) ? true : false;

    this.setState ((prevState) => ({
      chatName: {
        ...prevState,
        isValid,
        value: '',
      }
    }));
    
    return isValid;
  }

  handleInputChange = (event) => {
    event.persist();
    const { name, value } = event.target;
    this.setState ((prevState) => ({
      [name] : {
        ...prevState[name],
        value
      }
    }))
  }

  handleAddChatSubmit = (event) => {
    event.preventDefault();
    const { chatName } = this.state;
    if (!this.validate()) {
      return;
    }
    this.props.onSubmit(chatName.value);
    this.props.closeModals();
  }

  render () {
    const { classes } = this.props;
    const { chatName } = this.state;
    const helperText = (chatName.isValid) ? '' : 'Please use letters, digits, space and . - ? !'

    return (
      <React.Fragment>
        <h3>Create new chat</h3>
        <form className={classes.form} onSubmit={this.handleAddChatSubmit}>
          <TextField 
            required
            fullWidth
            label="New chat name"
            name="chatName"
            placeholder="Select chat name"
            type="text"
            margin="normal"
            autoComplete="chatName"
            value={chatName.value}
            error={!chatName.isValid}
            onChange={this.handleInputChange}
            helperText={helperText}
          />
          <Button
            type="submit"
            fullWidth
            variant="text"
            color="primary"
          >
            Create
          </Button>
        </form>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(AddChat);
