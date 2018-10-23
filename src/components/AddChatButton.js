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

class AddChatButton extends React.Component {
  constructor(props) {
    super(props)
    this.clickHandler = this.clickHandler.bind(this)
  }

  clickHandler () {
    this.props.addHandler('chatModal');
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button 
          variant="fab" 
          color="primary" 
          aria-label="Add" 
          className={classes.addChatButton}
          onClick={this.clickHandler}
        >
          <AddIcon />
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(AddChatButton);
