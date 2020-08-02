import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getMyTasks, deleteMyTask } from '../flux/actions/taskActions';
import { ITodoList } from '../types/interfaces';
import Button from '@material-ui/core/Button';
import AddTaskModal from '../components/AddTaskModal';
import { history } from '../flux/history';
const UserPage = ({ getMyTasks, task, deleteMyTask }: ITodoList) => {
  useEffect(() => {
    getMyTasks();
  }, [getMyTasks]);

  const handleDelete = (id: string) => {
    deleteMyTask(id);
  };

  const handleEdit = (id: any) => {
    history.push({
      pathname: '/editTask/' + id,
    });
  };

  const { tasks } = task;

  return (
    <div>
      <AddTaskModal />
      <table className="table">
        <thead>
          <th className="th-width">Task id</th>
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
                <td data-label="Id" style={{ overflowWrap: 'break-word' }}>
                  {_id}
                </td>

                <td data-label="User" style={{ overflowWrap: 'break-word' }}>
                  {user}
                </td>
                <td data-label="Name Of User" className="wrapText">
                  {nameOfUser}
                </td>
                <td data-label="Created At" className="wrapText">
                  {createdAt}
                </td>
                <td data-label="Title" className="wrapText">
                  {title}
                </td>
                <td data-label="Description" className="wrapText">
                  {description}
                </td>
                <td data-label="Edit">
                  <Button className="edit-btn" variant="contained" color="primary" onClick={() => handleEdit(_id)}>
                    Edit
                  </Button>
                </td>
                <td data-label="Delete">
                  <Button
                    className="delete-btn"
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(_id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  task: state.task,
  user: state.user,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  getMyTasks,
  deleteMyTask,
})(UserPage);
