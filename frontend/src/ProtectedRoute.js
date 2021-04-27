import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkAuthenticated } from './actions/auth';

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
