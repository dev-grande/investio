import React from 'react';
import { Dashboard } from './pages/Dashboard';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';
import  NavBar  from './features/NavBar';
import { Route, Switch, Redirect } from 'react-router-dom';

export const Routes = () => {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/Dashboard" component={Dashboard} />
        <Route exact path="/">
          <Redirect to="/Dashboard" />
        </Route>
        <Route exact path="/Reports" component={Reports} />
        <Route exact path="/Settings" component={Settings} />
      </Switch>
    </div>
  );
};