import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './containers/Home';
import Login from './containers/Login/Login';
import Signup from './containers/Signup';
import Activate from './containers/Activate';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';
import StartPage from './containers/StartPage';
import store from './store';
import Layout from './hocs/Layout';
import CreateExercises from './containers/CreateExercises/CreateExercises';
import PlaySets from './containers/PlaySets';

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={StartPage} />
        <Layout>
          <Route exact path="/home" component={Home} />
          <Route exact path="/createexercise" component={CreateExercises} />
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
