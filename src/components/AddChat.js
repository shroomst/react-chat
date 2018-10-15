import React from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  addChatButton: {
    margin: theme.spacing.unit,
    position: "fixed",
    bottom: 65,
    left:230
  },
});

const AddChat= ({ classes }) => (
  <div>
    <Button variant="fab" color="primary" aria-label="Add" className={classes.addChatButton}>
      <AddIcon />
    </Button>
  </div>
);

export default withStyles(styles)(AddChat);
