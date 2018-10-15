// for future development
import React from 'react';
import Typography from '@material-ui/core/Typography';

const ChatEvent = ({ colorA, author, event, when }) => (
  <React.Fragment>
    <div style ={{display: "flex"}}>
      <Typography variant="body1" color={colorA}>
        {author} 
      </Typography> 
      <Typography variant="body1"  style={{marginLeft:5}}>
        has {event}
      </Typography>
    </div>  
    <Typography variant="caption" >
      {when}
    </Typography>
  </React.Fragment>
);

export default ChatEvent;
