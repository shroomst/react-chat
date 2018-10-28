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

const BottomNav = ({ classes, handleChange, selectedChatsFilter }) => (
  <div className={classes.bottomNav}>
    <BottomNavigation showLabels onChange={handleChange} value={selectedChatsFilter}>
      <BottomNavigationAction value="my" label="MyChats" icon={<RestoreIcon />}/>
      <BottomNavigationAction value="all" label="Explore" icon={<ExploreIcon />}/>
    </BottomNavigation>
  </div>
);

export default withStyles(styles)(BottomNav);
