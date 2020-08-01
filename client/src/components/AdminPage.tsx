import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllTasks, deleteTask } from '../flux/actions/taskActions';
import { ITaskReduxProps, ITodoList } from '../types/interfaces';
import Button from '@material-ui/core/Button';
import { history } from '../flux/history';

const AdminPage = ({ getAllTasks, task, deleteTask }: ITodoList) => {
  const { tasks } = task;
  useEffect(() => {
    getAllTasks();
  }, [getAllTasks]);

  const handleDelete = (id: string) => {
    deleteTask(id);
  };

  const handleEdit = (id: string) => {
    history.push({
      pathname: '/editTask/' + id,
    });
  };

  return (
    <table className="table">
      <thead>
        <th>Task id</th>
        <th>User id</th>
        <th>User</th>
        <th>Task create at</th>
        <th>Task Title</th>
        <th>Task Description</th>
        <th>Action</th>
        <th>Action</th>
      </thead>
      <tbody>
        {tasks &&
          tasks.map(({ _id, title, description, user, nameOfUser, createdAt }) => (
            <tr key={_id}>
              <td data-label="Id">{_id}</td>
              <td data-label="User">{user}</td>
              <td data-label="Name Of User">{nameOfUser}</td>
              <td data-label="Created At">{createdAt}</td>
              <td data-label="Title">{title}</td>
              <td data-label="Description">{description}</td>
              <td data-label="Edit">
                <Button className="edit-btn" variant="contained" color="primary" onClick={() => handleEdit(_id)}>
                  Edit
                </Button>
              </td>
              <td data-label="Delete">
                <Button className="delete-btn" variant="contained" color="secondary" onClick={() => handleDelete(_id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

const mapStateToProps = (state: ITaskReduxProps) => ({
  task: state.task,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getAllTasks, deleteTask })(AdminPage);
