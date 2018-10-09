import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MUAvatar from '@material-ui/core/Avatar';
import titleInitials from '../utils/title-initials';
import getColor from '../utils/color-from';

const styles = {
  
};

const Avatar = ({ colorFrom, children, ...rest }) => (
      <MUAvatar style={{backgroundColor: getColor(colorFrom)}} {...rest}>
        {titleInitials(children)}
      </MUAvatar> 
  );

export default withStyles(styles)(Avatar);
