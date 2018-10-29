import React from 'react';
import { Redirect } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import LockIcon from '@material-ui/icons/LockOutlined';
import Register from '@material-ui/icons/Create';
import withStyles from '@material-ui/core/styles/withStyles';

import RegisterForm from './RegisterForm'
import SignInForm from './SignInForm'
import WelcomeHeaderBar from './WelcomeHeaderBar'

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
});

class WelcomePage extends React.Component {
  state = {
    activeTab: 0,
  };

  handleChange = (event, value) => {
    this.setState({ activeTab: value });
  };

  render() {
    const { classes, signup, login, isAuthenticated, errorSignInMessage, errorRegisterMessage } = this.props;
    const { activeTab } = this.state;

    if (isAuthenticated) {
      return (
        <Redirect to="/chat"/>
      );
    }

    return (
      <React.Fragment>
        <WelcomeHeaderBar/>
        <div>
          <CssBaseline/>
          <AppBar position="static">
            <Tabs 
              value={activeTab}
              onChange={this.handleChange}
              fullWidth
            >
              <Tab icon={<LockIcon/>} label="Sign In"/>
              <Tab icon={<Register/>} label="Register"/>
            </Tabs>
          </AppBar>
          <main className={classes.layout}>
            <Paper className={classes.paper}>
              {activeTab === 0 && <SignInForm onSubmit={login} errorMessage={errorSignInMessage}/>}
              {activeTab === 1 && <RegisterForm onSubmit={signup} errorMessage={errorRegisterMessage}/>}
            </Paper>
          </main>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles (styles)(WelcomePage);
