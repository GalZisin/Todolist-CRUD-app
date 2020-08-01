import React from 'react';
import AppNavbar from './components/AppNavbar';
import { Router, Switch, Route } from 'react-router-dom';
import store from './flux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { history } from './flux/history';
import { PrivateAdminRoute } from './components/PrivateAdminRoute';
import { PrivateUserRoute } from './components/PrivateUserRoute';
import Home from './components/Home';
import AdminPage from './components/AdminPage';
import UserPage from './components/UserPage';
import EditTask from './components/EditTask';
import { Provider } from 'react-redux';
const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <AppNavbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateAdminRoute path={'/AdministratorPage'} component={AdminPage} />
          <PrivateUserRoute path={'/UserPage'} component={UserPage} />
          <Route path="/editTask/:id" component={EditTask} />
          <Route path="*" component={Home} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
