import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import UserMenu from './UserMenu';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';

const drawerWidth = 320;

const styles = theme => ({
  appBar: {
    position: 'fixed',
    width: `calc(100% - ${drawerWidth}px)`,
  },
  title: {
    width: "80%",
  }
});

const ApplicationBar = ({ classes })=>  (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <div className={classes.title}>
        <Typography variant="title" color="inherit" noWrap>
          Chat on React
        </Typography>
        </div>
        <UserMenu/>
      </Toolbar>
    </AppBar>
  );

 export default withStyles (styles)(ApplicationBar);
