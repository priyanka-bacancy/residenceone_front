import React, { Component } from 'react';
import { Route, Router, Switch } from 'react-router-dom';

import history from './history';
import Login from './component/login/Login';
import Dashboard from './component/admin/dashboard';
import NotFound from './NotFound';

class App extends Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/admin' component={Dashboard} />
            <Route path='/apps' component={Dashboard} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;