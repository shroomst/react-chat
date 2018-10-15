import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

function ChatEvent(props) {

  return (
    <Grid 
      container 
      spacing={0} 
      direction="row"
      justify="center"
      alignItems="flex-start"
      noWrap
    > 
      <Grid item >
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
      </Grid>  
    </Grid>
  );
}

export default ChatEvent;
