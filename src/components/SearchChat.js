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

function SearchChat(props) {
    const {classes}=props;
    return (
        <div className={classes.drawerHeader}>
            <Input 
            placeholder="Search chats..."
            className={classes.searchInput}
            fullWidth
            />
        </div>
    );
}

export default withStyles(styles)(SearchChat);

 