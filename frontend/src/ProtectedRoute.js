import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkAuthenticated } from './actions/auth';

/**
 * This component is used to redirect users to log in if they try to access a protected component
 * without being logged in.
 * Currently the routes /Home and /createexercise require authenticated users.
 * Even if an unauthenticated user manages to access these routes, the API calls would be blocked.
 * Protected routes are mainly used for UX, and not for security measures.
 * @author Simen
 * @param {object} props
 * @property {component} comp The component to be routed to.
 * @property {boolean} isAuthenticated the user's authentication status.
 * @property {string} path The relative path to the component to be routed to.
 * @property {list} rest Other not specific props.
 * @returns Redirect to the correct path and component.
 */
const ProtectedRoute = ({
  component: Comp,
  isAuthenticated,
  path,
  ...rest
}) => {
  checkAuthenticated();
  const loggedIn = isAuthenticated;

  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        return loggedIn === false ? (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                prevLocation: path,
              },
            }}
          />
        ) : (
          <Comp {...props} />
        );
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(ProtectedRoute);
