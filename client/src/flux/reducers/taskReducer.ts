// import React, { createContext, useReducer } from 'react';
import {
  GET_TASKS,
  ADD_TASK,
  DELETE_TASK,
  TASKS_LOADING,
  LOGOUT_SUCCESS,
} from "../actions/types";
import { IAction, ITask } from "../../types/interfaces";

export const initialState = {
  tasks: [],
  loading: false,
};

interface IState {
  tasks: ITask[];
}

export default function (state: IState = initialState, action: IAction) {
  switch (action.type) {
    case GET_TASKS:
      return {
        ...state,
        tasks: action.payload,
        loading: false,
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
      };
    case ADD_TASK:
      return {
        ...state,
        tasks: [action.payload.data.resTask, ...state.tasks],
      };
    case TASKS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case "EDIT_TASK":
      const updateTask = action.payload;

      const updateTasks = state.tasks.map((task) => {
        if (task._id === updateTask.id) {
          return updateTask;
        }
        return task;
      });
      return {
        ...state,
        tasks: updateTasks,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        tasks: null,
      };
    default:
      return state;
  }
}
