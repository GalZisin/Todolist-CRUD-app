import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getMyTasks, deleteMyTask } from '../flux/actions/taskActions';
import { ITodoList } from '../types/interfaces';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AddTaskModal from '../components/AddTaskModal';
import { Container } from 'reactstrap';
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
      <Container>
        <AddTaskModal />
        <TableContainer component={Paper}>
          <Table style={{ minWidth: 100 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Task id</TableCell>
                <TableCell>User id</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Task create at</TableCell>
                <TableCell>Task Title</TableCell>
                <TableCell>Task Description</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks &&
                tasks.map(({ _id, title, description, user, nameOfUser, createdAt }) => (
                  <TableRow key={_id}>
                    <TableCell>{_id}</TableCell>
                    <TableCell>{user}</TableCell>
                    <TableCell>{nameOfUser}</TableCell>
                    <TableCell>{createdAt}</TableCell>
                    <TableCell>{title}</TableCell>
                    <TableCell>{description}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary" onClick={() => handleEdit(_id)}>
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" color="secondary" onClick={() => handleDelete(_id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
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
