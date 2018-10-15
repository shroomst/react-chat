import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import ExploreIcon from '@material-ui/icons/Explore';

const styles = {
  bottomNav: {
    position: "fixed",
    bottom: 0,
    width: 320,
  }
};

class BottomNav extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.bottomNav}>
        <BottomNavigation showLabels>
          <BottomNavigationAction label="MyChats" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Explore" icon={<ExploreIcon />} />
        </BottomNavigation>
      </div>
    );
  }
}

export default withStyles(styles)(BottomNav);
