import axios from 'axios';
import { GET_TASKS, ADD_TASK, DELETE_TASK, TASKS_LOADING } from './types';
import { returnErrors } from './errorActions';
import { ITask } from '../../types/interfaces';
import { baseUrl } from './baseUrl';
// const baseUrl = 'http://localhost:4000';

export const getAllTasks = () => (dispatch: Function, getState: Function) => {
  dispatch(setTasksLoading());
  let token = localStorage.getItem('token');
  if (!token) return;

  const instance = axios.create({
    baseURL: baseUrl,
    headers: { Authorization: 'Bearer ' + token },
  });
  instance
    .get('/api/tasks/getAllTasks')
    .then((res) => {
      dispatch({
        type: GET_TASKS,
        payload: res.data,
      });
      // const timer = setTimeout(() => {
      //   console.log("PrivateAdminRoute After time out...!");
      // }, 1000);
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const getMyTasks = () => (dispatch: Function, getState: Function) => {
  dispatch(setTasksLoading());
  let token = localStorage.getItem('token');
  if (!token) return;
  const instance = axios.create({
    baseURL: baseUrl,
    headers: { Authorization: 'Bearer ' + token },
  });
  instance
    .get('/api/tasks/getMytasks')
    .then((res) => {
      dispatch({
        type: GET_TASKS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const addTask = (task: ITask) => async (dispatch: Function, getState: Function) => {
  let token = localStorage.getItem('token');
  if (!token) return;
  let title = task.title;
  let description = task.description;

  const config = {
    headers: { Authorization: 'Bearer ' + token },
  };
  let res: any = null;
  try {
    res = await axios.post(baseUrl + '/api/tasks/createTask', { title: title, description: description }, config);
    await dispatch({
      type: ADD_TASK,
      payload: res.data,
    });
  } catch (err) {
    console.log('err: ' + JSON.stringify(err));
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

export const deleteMyTask = (id: string) => (dispatch: Function, getState: Function) => {
  let token = localStorage.getItem('token');
  const config = {
    headers: { Authorization: 'Bearer ' + token },
  };
  axios
    .delete(baseUrl + `/api/tasks/deleteMyTask/${id}`, config)
    .then((res) =>
      dispatch({
        type: DELETE_TASK,
        payload: id,
      })
    )
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const deleteTask = (id: string) => (dispatch: Function, getState: Function) => {
  let token = localStorage.getItem('token');
  const config = {
    headers: { Authorization: 'Bearer ' + token },
  };
  axios
    .delete(baseUrl + `/api/tasks/deleteTask/${id}`, config)
    .then((res) =>
      dispatch({
        type: DELETE_TASK,
        payload: id,
      })
    )
    .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const setTasksLoading = () => {
  return {
    type: TASKS_LOADING,
  };
};
