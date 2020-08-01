import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { history } from './helpers';
import { alertActions } from './reducers/actions';
import { PrivateRoute } from './features/PrivateRoute';

import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { Dashboard } from './pages/Dashboard';
import { Settings } from './pages/Settings';
import { Reports } from './pages/Reports';


export function App() {
  const alert = useSelector(state => state.alert);
  const dispatch = useDispatch();

  useEffect(() => {
      history.listen(() => {
          // clear alert on location change
          dispatch(alertActions.clear());
      });
  }, []);

  return (
      <div >
                  {alert.message &&
                      <div className={`alert ${alert.type}`} style={{marginBottom: "0"}}>{alert.message}
                      </div>
                  }
                  <Router history={history}>
                      <Switch>
                          <PrivateRoute exact path="/" component={Dashboard} />
                          <PrivateRoute exact path="/Dashboard" component={Dashboard} />
                          <PrivateRoute exact path="/Reports" component={Reports} />
                          <PrivateRoute exact path="/Settings" component={Settings} />
                          <Route path="/login" component={LoginPage} />
                          <Route path="/register" component={RegisterPage} />
                          <Redirect from="*" to="/" />
                      </Switch>
                  </Router>
      </div>
  );
}



