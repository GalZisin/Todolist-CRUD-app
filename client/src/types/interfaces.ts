import { E_ERROR } from "./enum";

// REACT
export interface ITarget {
  target: {
    value: React.SetStateAction<string>;
  };
  preventDefault(): void;
}

// ERRORS
export interface IMsg {
  msg: string | any;
}

// AUTH
export interface IUser {
  name?: string;
  email: string;
  password: string;
}

export interface IAuthForm {
  isAuthenticated?: boolean;
  error: IError;
  clearErrors(): void;
}

export interface ILoginModal extends IAuthForm {
  login(user: IUser): void;
}

export interface IRegisterModal extends IAuthForm {
  register(user: IUser): void;
}

export interface ILogoutProps {
  logout(): void;
}

export interface IError {
  id: E_ERROR;
  msg: IMsg;
}

export interface IAuthReduxProps {
  auth: { isAuthenticated: boolean };
  error: IError;
}

export interface IConfigHeaders {
  headers: {
    [index: string]: string;
  };
}

// NAVBAR
export interface IAppNavbar {
  auth?: {
    isAuthenticated: boolean;
    user: IUser;
  };
}
//USERS
export interface IExistingUser {
  _id: string;
  name: string;
}

// TASKS
export interface IExistingTask {
  _id: string;
  title: string;
  description: string;
  user: string;
  nameOfUser: string;
  createdAt: string;
}

export interface ITask {
  _id: string;
  user: string;
  title: any;
  description: any;
  nameOfUser: any;
}

export interface ITaskModal {
  // _id: string;
  // user: string;
  // description: any;
  // nameOfUser: any;
  isAuthenticated: boolean;
  addTask(task: ITask): void;
}
export interface IEditTask {
  updateCurrentTask(task: ITask): void;
}

export interface ITaskReduxProps extends IAuthReduxProps {
  task: {
    tasks: IExistingTask[];
  };
}
// export interface IUserReduxProps extends IAuthReduxProps {
//   user: {
//     users: IExistingUser[];
//   };
// }
export interface ITodoList {
  task: {
    tasks: IExistingTask[];
  };
  user: {
    users: IExistingUser[];
  };
  getAllTasks(): void;
  getMyTasks(): void;
  deleteTask(id: string): void;
  deleteMyTask(id: string): void;
  getAllUsers(): void;
  isAuthenticated: boolean;
}

// <<<<<<<<<<<>>>>>>>>>>>>
// <<<<<<<< FLUX >>>>>>>>>
// <<<<<<<<<<<>>>>>>>>>>>>

export interface IAuthFunction {
  name?: string;
  email: string;
  password: string;
}

export interface IReturnErrors {
  msg: {
    msg: string | any;
  };
  status: string;
  id: any;
}

export interface IAction {
  type: string;
  payload?: any;
}
