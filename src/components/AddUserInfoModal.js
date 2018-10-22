import React from 'react';
import Modal from 'react-modal';
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

const addChatModalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  },
  content : {
    top         : '50%',
    left        : '50%',
    right       : 'auto',
    bottom      : 'auto',
    marginRight : '-50%',
    width       :  '30%',
    transform   : 'translate(-50%, -50%)',
  }
};

Modal.setAppElement('#root');

class AddChatModal extends React.Component {
  state = {
    chatName: {
      value: '',
      isValid: true,
    }
  }

  validate() {
    const { chatName } = this.state;
    const isValid = (/^[A-Za-z0-9 ]+$/.test(chatName.value)) ? true : false;

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
    this.props.onRequestClose();
  }

  render () {
    const { isOpen, onAfterOpen, onRequestClose, contentLabel, classes } = this.props;
    const { chatName } = this.state;
    const helperText = (chatName.isValid) ? '' : 'Please use only letters, space and numbers'

    return (  
      <Modal
        isOpen={isOpen}
        onAfterOpen={onAfterOpen}
        onRequestClose={onRequestClose}
        style={addChatModalStyles}
        contentLabel={contentLabel}
      >
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
            className={classes.loginSubmit}
          >
            Create
          </Button>
        </form>
      </Modal>
    );
  }
}

export default withStyles(styles)(AddChatModal);
