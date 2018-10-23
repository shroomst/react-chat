import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import ChatPage from '../containers/ChatPage'
import WelcomePage from '../containers/WelcomePage'
import PrivateRoute from '../containers/PrivateRoute'
import history from '../utils/history'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    suppressDeprecationWarnings: true
  }
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/(welcome)?" component={WelcomePage}/>
        <PrivateRoute path="/chat/:chatId?" component={ChatPage}/>
        <Redirect to="/"/>
      </Switch>
    </ConnectedRouter>
  </MuiThemeProvider>
);

export default App;
