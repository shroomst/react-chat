import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SignInIcon from '@material-ui/icons/LockOutlined';
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
  loginSubmit: {
    marginTop: theme.spacing.unit * 6,
  },
});

class SignInForm extends React.Component {
  state = {
    username: {
      value: '',
      isValid: true,
    },
    password: {
      value: '',
      isValid: true,
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

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const { onSubmit } = this.props;
    onSubmit(username.value, password.value);
  };

  render() {
    const { classes, errorMessage } = this.props;
    const { username, password } = this.state;

    return (
      <React.Fragment>
        <Avatar className={classes.avatar}>
          <SignInIcon />
        </Avatar>
        <Typography variant="h5">Sign in</Typography>
        <form className={classes.form} onSubmit={this.handleSubmit}>
          <TextField
            required
            fullWidth
            label="Username"
            name="username"
            placeholder="Enter your username (required)"
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
            placeholder="Enter your password (required)"
            type="password"
            margin="normal"
            autoComplete="password"
            value={password.value}
            onChange={this.handleInputChange}
            error={!password.isValid}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.loginSubmit}
          >
            Sign in
          </Button>
        </form>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(SignInForm);
