import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllTasks, deleteTask } from '../flux/actions/taskActions';
import { ITaskReduxProps, ITodoList } from '../types/interfaces';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
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
            <TableCell></TableCell>
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
  );
};

const mapStateToProps = (state: ITaskReduxProps) => ({
  task: state.task,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getAllTasks, deleteTask })(AdminPage);

// class AdminPage extends React.Component {
//   constructor(props: any) {
//     super(props);
//   }
//   render() {
//     console.log('props');
//     const { tasks } = this.props.task;
//     return (
//       <TableContainer component={Paper}>
//         <Table style={{ minWidth: 100 }} aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               <TableCell>Task id</TableCell>
//               <TableCell>User id</TableCell>
//               <TableCell>User</TableCell>
//               <TableCell>Task Title</TableCell>
//               <TableCell>Task Description</TableCell>
//               <TableCell>Action</TableCell>
//               <TableCell></TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {tasks.map(({ _id, title, description, user, nameOfUser }) => (
//               <TableRow key={_id}>
//                 <TableCell>{_id}</TableCell>
//                 <TableCell>{user}</TableCell>
//                 <TableCell>{nameOfUser}</TableCell>
//                 <TableCell>{title}</TableCell>
//                 <TableCell>{description}</TableCell>
//                 <TableCell>
//                   <Button variant="contained" color="primary" onClick={() => handleEdit(_id)}>
//                     Edit
//                   </Button>
//                 </TableCell>
//                 <TableCell>
//                   <Button variant="contained" color="secondary" onClick={() => handleDelete(_id)}>
//                     Delete
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     );
//   }
// }
// const mapStateToProps = (state: any) => {
//   return {
//     task: state.task,
//     isAuthenticated: state.auth.isAuthenticated,
//   };
// };
// export default connect(mapStateToProps, { getAllTasks, deleteTask })(AdminPage);
