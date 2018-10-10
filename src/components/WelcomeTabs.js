import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import LockIcon from '@material-ui/icons/LockOutlined';
import Register from '@material-ui/icons/BorderColor';
import RegisterForm from './RegisterForm'
import SignInForm from './SignInForm'

const styles = theme =>  ({
  formWrapper: {
    display: "flex",
    alignItems: 'center',
    margin: "0 auto",
    maxWidth: 500,
  }
});

class IndexTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className="formWrapper">
        <CssBaseline/>
       <AppBar position="static">
          <Tabs 
            value={this.state.value}
            onChange={this.handleChange}
            fullWidth
            indicatorColor="secondary"
          >
          <Tab icon={<LockIcon />} label="Sign In" />
          <Tab icon={<Register />} label="Register" />
          </Tabs>
        </AppBar>
        {value === 0 && <SignInForm/>}
        {value === 1 && <RegisterForm/>}
      </div>
    );
  }
}


export default withStyles(styles)(IndexTabs);
