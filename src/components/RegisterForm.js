import React from 'react';
import PropTypes from 'prop-types';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import RegisterIcon from '@material-ui/icons/Create';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
    height: 300,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class RegisterForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    errorMessage: PropTypes.string,
  };

  static defaultProps = {
    errorMessage: '',
  };

  state = {
    username: {
      value: '',
      isValid: true,
    },
    password: {
      value: '',
      isValid: true,
    },
    confirmPassword: {
      value: '',
      isValid: true,
    },
    errorPasswordMessage: {
      value: '',
    },
  };

  handleInputChange = (event) => {
    event.persist();
    const { name, value } = event.target;
    this.setState(prevState => ({
      [name]: {
        ...prevState[name],
        value,
      },
    }));
  };

  validate = () => {
    const { password, confirmPassword } = this.state;
    const isValid = password.value === confirmPassword.value;
    const errorPasswordMessage = isValid ? '' : 'Passwords do not match';

    this.setState(prevState => ({
      password: {
        ...prevState,
        isValid,
        value: '',
      },
      confirmPassword: {
        ...prevState,
        isValid,
        value: '',
      },
      errorPasswordMessage: {
        ...prevState,
        value: errorPasswordMessage,
      },
    }));

    return isValid;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const { onSubmit } = this.props;
    if (!this.validate()) {
      return;
    }
    onSubmit(username.value, password.value);
  };

  render() {
    const { classes, errorMessage } = this.props;
    const {
      username, password, confirmPassword, errorPasswordMessage,
    } = this.state;
    return (
      <React.Fragment>
        <Avatar className={classes.avatar}>
          <RegisterIcon />
        </Avatar>
        <Typography variant="h5">Register</Typography>
        <form className={classes.form} onSubmit={this.handleSubmit}>
          <TextField
            required
            fullWidth
            label="Username"
            name="username"
            placeholder="Select your username (required)"
            type="text"
            margin="normal"
            autoComplete="username"
            value={username.value}
            onChange={this.handleInputChange}
            error={!!errorMessage}
            helperText={errorMessage}
          />
          <TextField
            required
            fullWidth
            label="Password"
            name="password"
            placeholder="Select your password (required)"
            type="password"
            margin="normal"
            autoComplete="new-password"
            value={password.value}
            onChange={this.handleInputChange}
            error={!password.isValid}
            helperText={errorPasswordMessage.value}
          />
          <TextField
            required
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Confirm your password (required)"
            type="password"
            margin="normal"
            autoComplete="new-password"
            value={confirmPassword.value}
            onChange={this.handleInputChange}
            error={!confirmPassword.isValid}
            helperText={errorPasswordMessage.value}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Register
          </Button>
        </form>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(RegisterForm);
