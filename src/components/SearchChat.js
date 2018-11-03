import React from 'react';
import PropTypes from 'prop-types';

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

class SearchChat extends React.Component {
  static propTypes = {
    searchHandler: PropTypes.func.isRequired,
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
  };

  inputHandler = (event) => {
    event.persist();
    const { value } = event.target;
    const { searchHandler } = this.props;
    searchHandler(value);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.drawerHeader}>
        <Input
          placeholder="Search chats..."
          className={classes.searchInput}
          fullWidth
          onChange={this.inputHandler}
        />
      </div>
    );
  }
}

export default withStyles(styles)(SearchChat);
