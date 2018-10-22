import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';

const styles = theme => ({
      drawerHeader: {
        ...theme.mixins.toolbar,   
        paddingLeft: theme.spacing.unit * 3,
        paddingRight: theme.spacing.unit * 3,
      },

      searchInput: {
        marginTop: 15,
       },
});

const SearchChat = ({ classes }) => (
  <div className={classes.drawerHeader}>
    <Input 
    placeholder="Search chats..."
    className={classes.searchInput}
    fullWidth
    />
  </div>
);

export default withStyles(styles)(SearchChat);

 