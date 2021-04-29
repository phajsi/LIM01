import axios from 'axios';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  AUTHENTICATED_FAIL,
  AUTHENTICATED_SUCCESS,
  LOGOUT,
  PASSWORD_RESET_CONFIRM_FAIL,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL,
} from './types';

/**
 * This code is based on a youtube tutorial:
 * Django & React JWT Authentication by Bryan Dunn
 * https://www.youtube.com/watch?v=QFDyXWRYQjY&list=PLJRGQoqpRwdfoa9591BcUS6NmMpZcvFsM
 * It has been modified and changed to fit our project.
 * @author Phajsi, Simen
 */

/**
 * Updates redux state with user information from backend if user is logged in.
 * @returns Dispatch for updating redux store with user info if user is logged in.
 */
export const load_user = () => async (dispatch) => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    };

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/users/me/`,
        config
      );

      dispatch({
        type: USER_LOADED_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: USER_LOADED_FAIL,
      });
    }
  } else {
    dispatch({
      type: USER_LOADED_FAIL,
    });
  }
};

/**
 * Sends request to backend if email and password are correct
 * and updates redux state with returned authorization tokens and user.
 * @param {string} email Provided by user as login credentials on login page.
 * @param {string} password Provided by user as login credentials on login page.
 * @returns Dispatch for updating redux states with error or user and tokens.
 */
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/jwt/create/`,
      body,
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(load_user());
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.status,
    });
  }
};

/**
 * Registers new unverified/unactivated user backend if provided details are valid.
 * @param {string} name Username the user has chosen.
 * @param {string} email Email the user has chosen.
 * @param {string} password Password the user has chosen.
 * @param {string} re_password Retyped password for confirming the user has typed correctly.
 * @returns Dispatch for updating redux state with error or confirm.
 */
export const signup = (name, email, password, re_password) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, password, re_password });

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/users/`,
      body,
      config
    );

    dispatch({
      type: SIGNUP_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SIGNUP_FAIL,
      payload: err.response.data,
    });
  }
};

/**
 * Action used for verifying an account. It updates user backend with a verified=true field.
 * A user needs to be verified to be able to log in. This action is run when user clicks
 * Verify button in verify component after receiving a confirmation mail.
 * @param {integer} uid Id for identifying user being verified
 * @param {string} token Unique token connected to user for verifying.
 * @returns Dispatch for updating redux state.
 */
export const verify = (uid, token) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ uid, token });

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/users/activation/`,
      body,
      config
    );

    dispatch({
      type: ACTIVATION_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ACTIVATION_FAIL,
    });
  }
};

/**
 * Chekcs if user is authenticated based on access token in local storage.
 * @returns Dispatch for checking and updating isAuthenticated state in redux.
 */
export const checkAuthenticated = () => async (dispatch) => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };

    const body = JSON.stringify({ token: localStorage.getItem('access') });

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/jwt/verify/`,
        body,
        config
      );

      if (res.data.code !== 'token_not_valid') {
        dispatch({
          type: AUTHENTICATED_SUCCESS,
        });
      } else {
        dispatch({
          type: AUTHENTICATED_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: AUTHENTICATED_FAIL,
      });
    }
  } else {
    dispatch({
      type: AUTHENTICATED_FAIL,
    });
  }
};

/**
 * Sends an email to the email address provided with a link to a component for updating password.
 * @param {string} email User provided email.
 * @returns Dispatch for updating states based on the api call response.
 */
export const reset_password = (email) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email });

  try {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/users/reset_password/`,
      body,
      config
    );

    dispatch({
      type: PASSWORD_RESET_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: PASSWORD_RESET_FAIL,
    });
  }
};

/**
 * Can be run after a user has clicked on the link after receinving an email after requesting password change.
 * The user can enter a new password and confirm password and clicking the confirm button.
 * An api call will be sent to backend to check if the password matches the requirements.
 * @param {integer} uid Id used for identifying users.
 * @param {string} token Unique token needed to be able to access the api.
 * @param {string} new_password New password the user has requested.
 * @param {string} re_new_password Confirmation of the password to avoid mistyping.
 * @returns Dispatch for updating redux state.
 */
export const reset_password_confirm = (
  uid,
  token,
  new_password,
  re_new_password
) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ uid, token, new_password, re_new_password });

  try {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`,
      body,
      config
    );

    dispatch({
      type: PASSWORD_RESET_CONFIRM_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: PASSWORD_RESET_CONFIRM_FAIL,
      payload: err.response.status,
    });
  }
};

/**
 * Deletes access tokens and refresh token from redux and local storage.
 * @returns Dispatch for deleteing access and refresh tokens from redux state.
 */
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
