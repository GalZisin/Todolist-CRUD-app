import React, { createContext, useReducer } from "react";
import { GET_USERS } from "../actions/types";
import { IAction, IUser } from "../../types/interfaces";

export const initialState = {
  users: [],
  loading: false,
};

interface IState {
  users: IUser[];
}

export default function (state: IState = initialState, action: IAction) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        tasks: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
