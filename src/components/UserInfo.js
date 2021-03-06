import React from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  form: {
    width      : '100%', // Fix IE11 issue.
    marginTop  : theme.spacing.unit,
    height     : 300,
  },
});

class UserInfo extends React.Component {
  state = {
    username: {
      value: this.props.username,
      isValid: true,
    },
    firstName: {
      value: (!!this.props.firstName) ? this.props.firstName : '',
      isValid: true,
    },
    lastName: {
      value: (!!this.props.lastName) ? this.props.lastName : '',
      isValid: true,
    },
  }

  validate(event) {
    event.persist();
    const { username, firstName, lastName } = this.state;
    const isValidUsername = (/^[A-Za-z0-9-.]+$/.test(username.value)) ? true : false;
    const isValidFirstName = (/(^([A-Za-z0-9а-яА-Я- ]+$)|^$)/.test(firstName.value)) ? true : false;
    const isValidLastName = (/(^([A-Za-z0-9а-яА-Я- ]+$)|^$)/.test(lastName.value)) ? true : false;

    this.setState({
      username: { ...username, isValid: isValidUsername },
      firstName: { ...firstName, isValid: isValidFirstName },
      lastName: { ...lastName, isValid: isValidLastName },
    });
    return isValidLastName && isValidUsername && isValidFirstName;
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

  handleUserInfoSubmit = (event) => {
    event.preventDefault();
    const { username, firstName, lastName } = this.state;
    if (!this.validate(event)) {
      return;
    }
    this.props.onSubmit(username.value, firstName.value, lastName.value);
    this.props.closeModals();
  }

  render () {
    const { classes, closeModals, disabled } = this.props;
    const { username, firstName, lastName } = this.state;
    const helperTextUsername = (username.isValid) ? '' : 'Please use latin letters, digits and . -'
    const helperTextFirstName = (firstName.isValid) ? '' : 'Please use letters, digits, space and . -'
    const helperTextLastName = (lastName.isValid) ? '' : 'Please use letters, digits, space and . -'

    return (
      <React.Fragment>
        <h3>Edit user info</h3>
        <form className={classes.form} onSubmit={this.handleUserInfoSubmit}>
          <TextField 
            required
            fullWidth
            label="Username"
            name="username"
            placeholder="Username"
            type="text"
            margin="normal"
            autoComplete="username"
            value={username.value}
            error={!username.isValid}
            onChange={this.handleInputChange}
            helperText={helperTextUsername}
          />
          <TextField 
            fullWidth
            label="First Name"
            name="firstName"
            placeholder="First Name"
            type="text"
            margin="normal"
            autoComplete="firstName"
            value={firstName.value}
            error={!firstName.isValid}
            onChange={this.handleInputChange}
            helperText={helperTextFirstName}
          />
          <TextField 
            fullWidth
            label="Last Name"
            name="lastName"
            placeholder="Last Name"
            type="text"
            margin="normal"
            autoComplete="lastName"
            value={lastName.value}
            error={!lastName.isValid}
            onChange={this.handleInputChange}
            helperText={helperTextLastName}
          />
          <Button
            type="submit"
            variant="text"
            color="primary"
            disabled={disabled}
          >
            Save
          </Button>
          <Button
            variant="text"
            color="secondary"
            style={{ marginLeft: 30 }}
            onClick={closeModals}
          >
            Close
          </Button>
        </form>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(UserInfo);
