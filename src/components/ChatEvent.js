import React from 'react';
import Typography from '@material-ui/core/Typography';

function ChatEvent(props) {
  return (
    <React.Fragment>
      <div style ={{display: "flex"}}>
        <Typography variant="body1" color={props.colorA}>
          {props.author} 
        </Typography> 
        <Typography variant="body1"  style={{marginLeft:5}}>
          has {props.event}
        </Typography>
      </div>  
      <Typography variant="caption" >
        {props.when}
      </Typography>
    </React.Fragment>
  );
}

export default ChatEvent;
