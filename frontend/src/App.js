import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './containers/Home';
import Login from './containers/Login/Login';
import Signup from './containers/Signup';
import Activate from './containers/Activate';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';
import store from './store';
import Layout from './hocs/Layout';
import Forstaelse from './containers/Forstaelse/Forstaelse';
import CreateExercises from './containers/CreateExercises/CreateExercises';
import Chat from './containers/Chat/Chat';
import PlaySets from './containers/PlaySets';
import RyddeSetninger from './containers/RyddeSetninger/RyddeSetninger';
import UserPage from './containers/UserPage';

const App = () => (
  <Provider store={store}>
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/forstaelse" component={Forstaelse} />
          <Route exact path="/createexercise" component={CreateExercises} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/reset-password" component={ResetPassword} />
          <Route exact path="/chat" component={Chat} />
          <Route exact path="/rydde-setninger" component={RyddeSetninger} />
          <Route exact path="/sets" component={PlaySets} />
          <Route exact path="/userpage" component={UserPage} />
          <Route
            exact
            path="/password/reset/confirm/:uid/:token"
            component={ResetPasswordConfirm}
          />
          <Route exact path="/activate/:uid/:token" component={Activate} />
        </Switch>
      </Layout>
    </Router>
  </Provider>
);

export default App;
