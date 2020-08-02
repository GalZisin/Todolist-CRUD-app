import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { addTask } from '../flux/actions/taskActions';
import { ITaskReduxProps, ITaskModal, ITarget } from '../types/interfaces';

const AddTaskModal = ({ isAuthenticated, addTask }: ITaskModal) => {
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const handleToggle = () => setModal(!modal);

  const handleChangeTitle = (e: ITarget) => setTitle(e.target.value);
  const handleChangeDescription = (e: ITarget) => setDescription(e.target.value);

  const handleOnSubmit = (e: any) => {
    e.preventDefault();

    const newTask: any = {
      title,
      description,
    };

    // Add item via addItem action
    addTask(newTask);
    // Close modal
    handleToggle();
  };

  return (
    <div>
      <Button color="dark" style={{ marginBottom: '2rem', marginLeft: 20 }} onClick={handleToggle}>
        Add Task
      </Button>
      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>Add new task</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleOnSubmit}>
            <FormGroup>
              <Label for="item">Task</Label>
              <Input
                type="text"
                name="name"
                // id="item"
                placeholder="Add title"
                onChange={handleChangeTitle}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="text"
                name="name"
                // id="item"
                placeholder="Add description"
                onChange={handleChangeDescription}
              />
              <Button color="dark" style={{ marginTop: '2rem' }} block>
                Add Task
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state: ITaskReduxProps) => ({
  task: state.task,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { addTask })(AddTaskModal);
