import axios from "axios";
import { GET_USERS } from "./types";
import { returnErrors } from "./errorActions";
import { ITask } from "../../types/interfaces";
import { baseUrl } from "./baseUrl";
// const baseUrl = 'http://localhost:4000';

export const getAllUsers = () => (dispatch: Function, getState: Function) => {
  //   dispatch(setTasksLoading());
  let token = localStorage.getItem("token");
  if (!token) return;
  const instance = axios.create({
    baseURL: baseUrl,
    headers: { Authorization: "Bearer " + token },
  });
  instance
    .get("/api/users/getAllUsers")
    .then((res) => {
      console.log("get all users: " + JSON.stringify(res));
      dispatch({
        type: GET_USERS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
