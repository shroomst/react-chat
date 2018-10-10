import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import ChatPage from './ChatPage';
import WelcomePage from './WelcomePage';
import WelcomeTabs from './WelcomeTabs';

const App = () => (
  <Router>
    <Switch>
      <Route path="/chat" component={ChatPage}/>
      <Route exact path="/(welcome)?" component={WelcomeTabs}/>
      <Redirect to="/" />
    </Switch>
  </Router>
)

export default App;
