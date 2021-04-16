/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
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
  let loggedIn = isAuthenticated;
  if (localStorage.getItem('access')) {
    loggedIn = true;
  }

  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        return loggedIn ? (
          <Comp {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                prevLocation: path,
                error: 'Du må logge inn for å få tilgang til den siden.',
              },
            }}
          />
        );
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(ProtectedRoute);
