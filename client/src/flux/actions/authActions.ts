import axios from 'axios';
import { returnErrors } from './errorActions';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from './types';
import { IAuthFunction, IConfigHeaders } from '../../types/interfaces';
import { history } from '../../flux/history';
import { baseUrl } from './baseUrl';
// const baseUrl = 'http://localhost:4000';

export const loadUser = () => async (dispatch: Function, getState: Function) => {
  // User loading
  dispatch({ type: USER_LOADING });

  let token = localStorage.getItem('token');

  if (!token) return;

  let res: any = null;
  try {
    const instance = axios.create({
      baseURL: baseUrl,
      headers: { Authorization: 'Bearer ' + token },
    });

    res = await instance.post('/api/users/loadUser');
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    console.log('err: ' + JSON.stringify(err));
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({
      type: AUTH_ERROR,
    });
  }

  if (res.data.role === 'admin') {
    history.push('/AdministratorPage');
  } else if (res.data.role === 'user') {
    history.push('/UserPage');
  }
};

// Register User
export const register = ({ name, email, password }: IAuthFunction) => (dispatch: Function) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request body
  const body = JSON.stringify({ name, email, password });
  axios
    .post(baseUrl + '/api/users/register', body, config)
    .then((res) => {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.data.user.role);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      history.push('/UserPage');
    })
    .then(() => {
      loadUser();
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

// Login User
export const login = ({ email, password }: IAuthFunction) => async (dispatch: Function) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  // // Request body
  // const body = JSON.stringify({ email, password });

  let res: any = null;
  try {
    res = await axios.post(baseUrl + `/api/users/login`, { email: email, password: password }, config);
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('role', res.data.data.user.role);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.log('err: ' + JSON.stringify(err));
    dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
    dispatch({
      type: LOGIN_FAIL,
    });
    return;
  }

  if (res.data.data.user.role === 'admin') {
    history.push('/AdministratorPage');
  } else if (res.data.data.user.role === 'user') {
    history.push('/UserPage');
  }
};

// Logout User
export const logout = () => {
  history.push('/');
  return {
    type: LOGOUT_SUCCESS,
  };
};

// Setup config/headers and token
export const tokenConfig = (getState: Function) => {
  // Get token from localstorage
  const token = getState().auth.token;

  // Headers
  const config: IConfigHeaders = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  // If token, add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};
