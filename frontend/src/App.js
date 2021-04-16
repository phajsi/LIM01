import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './containers/Home/Home';
import Login from './containers/UserAccess/Login';
import Signup from './containers/UserAccess/Signup';
import Activate from './containers/UserAccess/Activate';
import ResetPassword from './containers/UserAccess/ResetPassword';
import ResetPasswordConfirm from './containers/UserAccess/ResetPasswordConfirm';
import StartPage from './containers/StartPage/StartPage';
import store from './store';
import Layout from './hocs/Layout';
import CreateExercises from './containers/CreateExercises/CreateExercises';
import PlaySets from './containers/PlaySets/PlaySets';
import ProtectedRoute from './ProtectedRoute';

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={StartPage} />
        <Layout>
          <ProtectedRoute exact path="/home" component={Home} />
          <ProtectedRoute
            exact
            path="/createexercise"
            component={CreateExercises}
          />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/reset-password" component={ResetPassword} />
          <Route exact path="/sets" component={PlaySets} />
          <Route
            exact
            path="/password/reset/confirm/:uid/:token"
            component={ResetPasswordConfirm}
          />
          <Route exact path="/activate/:uid/:token" component={Activate} />
        </Layout>
      </Switch>
    </Router>
  </Provider>
);

export default App;
