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

const initialState = {
  access: localStorage.getItem('access'),
  refresh: localStorage.getItem('refresh'),
  isAuthenticated: null,
  user: null,
  signUpSuccess: false,
  loginError: null,
  PasswordReset: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case AUTHENTICATED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        signUpSuccess: false,
        loginError: null,
        PasswordReset: null,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('access', payload.access);
      return {
        ...state,
        isAuthenticated: true,
        access: payload.access,
        refresh: payload.refresh,
        loginError: null,
        PasswordReset: null,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        signUpSuccess: true,
        loginError: null,
        PasswordReset: null,
      };
    case AUTHENTICATED_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        signUpSuccess: false,
        loginError: null,
        PasswordReset: null,
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
        PasswordReset: null,
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
        PasswordReset: null,
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
        PasswordReset: null,
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
        PasswordReset: true,
      };
    case PASSWORD_RESET_CONFIRM_FAIL:
      return {
        ...state,
        signUpSuccess: payload,
        loginError: null,
        PasswordReset: payload,
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
