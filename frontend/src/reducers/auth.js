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
} from '../actions/types';

/**
 * This code is based on a youtube tutorial:
 * Django & React JWT Authentication by Bryan Dunn
 * https://www.youtube.com/watch?v=QFDyXWRYQjY&list=PLJRGQoqpRwdfoa9591BcUS6NmMpZcvFsM
 * It has been modified and changed to fit our project.
 * @author Phajsi, Simen
 */

/**
 * The state used when redux is initiated.
 * access: The access token stored in localstorage.
 * refresh: The refresh token stored in localstorage.
 * isAuthenticated: Boolean used for storing/checking authentication.
 * user: Object that stores current logged in user information.
 * signUpSuccess: Boolean for checking if signup was successful or what error occured.
 * loginError: Used for storing what error ocurred on failed login attempt.
 * passwordReset: Used for storing what error ocurred on failed password reset.
 */
const initialState = {
  access: localStorage.getItem('access'),
  refresh: localStorage.getItem('refresh'),
  isAuthenticated: null,
  user: null,
  signUpSuccess: false,
  loginError: null,
  passwordReset: null,
};

/**
 * Standard reducers used for user authentication. It is built as a switch case and
 * switches based on the Redux action being used and dispatched.
 * @param {object} state the initial state shown above.
 * @param {function} action Action dispatch function returning type for switch case and payload for data.
 * @returns Updated version of initialState.
 */

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case AUTHENTICATED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        signUpSuccess: false,
        loginError: null,
        passwordReset: null,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('access', payload.access);
      return {
        ...state,
        isAuthenticated: true,
        access: payload.access,
        refresh: payload.refresh,
        loginError: null,
        passwordReset: null,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        signUpSuccess: true,
        loginError: null,
        passwordReset: null,
      };
    case AUTHENTICATED_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        signUpSuccess: false,
        loginError: null,
        passwordReset: null,
      };
    case LOGIN_FAIL:
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      return {
        ...state,
        isAuthenticated: false,
        access: null,
        refresh: null,
        user: null,
        signUpSuccess: false,
        loginError: payload,
        passwordReset: null,
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: false,
        user: null,
        signUpSuccess: payload,
        loginError: null,
        passwordReset: null,
      };
    case LOGOUT:
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: false,
        user: null,
        signUpSuccess: false,
        loginError: null,
        passwordReset: null,
      };
    case USER_LOADED_SUCCESS:
      return {
        ...state,
        user: payload,
      };
    case USER_LOADED_FAIL:
      return {
        ...state,
        user: null,
      };
    case PASSWORD_RESET_SUCCESS:
    case PASSWORD_RESET_FAIL:
    case PASSWORD_RESET_CONFIRM_SUCCESS:
      return {
        ...state,
        passwordReset: true,
      };
    case PASSWORD_RESET_CONFIRM_FAIL:
      return {
        ...state,
        passwordReset: payload,
      };
    case ACTIVATION_SUCCESS:
    case ACTIVATION_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
}
