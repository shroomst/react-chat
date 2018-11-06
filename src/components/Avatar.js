import React from 'react';
import PropTypes from 'prop-types';

import MUAvatar from '@material-ui/core/Avatar';

import titleInitials from '../utils/title-initials';
import getColor from '../utils/color-from';

const Avatar = ({ colorFrom, children, ...rest }) => (
  <MUAvatar style={{ backgroundColor: getColor(colorFrom) }} {...rest}>
    {titleInitials(children)}
  </MUAvatar>
);

Avatar.propTypes = {
  colorFrom: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default Avatar;
