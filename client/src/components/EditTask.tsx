import React, { useState, useEffect, Fragment } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { ITaskReduxProps } from '../types/interfaces';
import { Link } from 'react-router-dom';
import { history } from '../flux/history';
import axios from 'axios';
import { baseUrl } from '../flux/actions/baseUrl';
// const baseUrl = 'http://localhost:4000';
let isAdmin: boolean = false;

const EditTask = (props: any) => {
  const [selectedTask, setSelectedTask] = useState({
    _id: '',
    title: '',
    description: '',
  });

  const currentTaskId = props.match.params.id;
  const { tasks } = props.task;

  const getRole = () => {
    const role = localStorage.getItem('role');
    if (role === 'admin') {
      isAdmin = true;
    } else {
      isAdmin = false;
    }
  };

  useEffect(() => {
    const TaskId = currentTaskId;
    const selectedTask: any = tasks.find((task: any) => task._id === TaskId);
    setSelectedTask(selectedTask);
    getRole();
  }, [currentTaskId, tasks]);

  const UpdateTask = (e: any) => {
    e.preventDefault();

    let token = localStorage.getItem('token');
    if (!token) return;
    let title = selectedTask.title;
    let description = selectedTask.description;
    let url: string = ``;

    let role = localStorage.getItem('role');
    if (role === 'admin') {
      url = `/api/tasks/updateTask/${currentTaskId}`;
    } else if (role === 'user') {
      url = `/api/tasks/updateMyTask/${currentTaskId}`;
    }

    const config = {
      headers: { Authorization: 'Bearer ' + token },
    };

    try {
      axios
        .patch(baseUrl + url, { title: title, description: description }, config)
        .then((res) => {
          const role = localStorage.getItem('role');
          if (role === 'admin') {
            history.push('/AdministratorPage');
          } else if (role === 'user') {
            history.push('/UserPage');
          }
        })
        .catch((err) => {});
    } catch (err) {
      console.log('err: ' + JSON.stringify(err));
    }
  };

  const onChange = (e: any) => {
    e.persist();
    setSelectedTask({
      ...selectedTask,
      [e.target.name]: e.target.value,
    });
  };

  const adminLink = (
    <Fragment>
      <Link to="/AdministratorPage" className="btn btn-danger ml-2">
        Cancel
      </Link>
    </Fragment>
  );

  const userLink = (
    <Fragment>
      <Link to="/UserPage" className="btn btn-danger ml-2">
        Cancel
      </Link>
    </Fragment>
  );

  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="12" lg="10" xl="8">
            <Card className="mx-4">
              <CardBody className="p-4">
                <Form onSubmit={UpdateTask}>
                  <h1>Update Task</h1>

                  <InputGroup className="mb-3">
                    <Input
                      type="text"
                      name="title"
                      //   id="title"
                      placeholder="Title"
                      value={selectedTask.title}
                      onChange={onChange}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <Input
                      type="text"
                      placeholder="Description"
                      name="description"
                      //   id="description"
                      value={selectedTask.description}
                      onChange={onChange}
                    />
                  </InputGroup>

                  <CardFooter className="p-4">
                    <Row>
                      <Col xs="12" sm="6">
                        <Button type="submit" className="btn btn-info mb-1" block>
                          <span>Save</span>
                        </Button>
                      </Col>

                      <Col xs="12" sm="6">
                        {isAdmin ? adminLink : userLink}
                      </Col>
                    </Row>
                  </CardFooter>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = (state: ITaskReduxProps) => ({
  task: state.task,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, null)(EditTask);
