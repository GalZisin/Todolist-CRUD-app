import { Request, Response } from 'express';
import Task from '../models/Task';
import User from '../models/User';
import { ITaskViewSchema } from '../models/TaskView';
import Moment from 'moment';
// import { Schema, model, Model, Document } from 'mongoose';
// import * as mongoose from 'mongoose';

export async function getMyTasks(req: any, res: Response): Promise<Response | void> {
  try {
    try {
      console.log('Run getMyTasks...');
      console.log('User= ' + req.user.id);
      let tw: any = null;
      let tasksView: Array<ITaskViewSchema>;
      tasksView = [];
      let FcreatedAt: any = null;
      const tasks = await Task.find({ user: req.user.id });
      let userObj: any = await User.findById(req.user.id);
      tasks.forEach((task: any) => {
        tw = {} as ITaskViewSchema;
        tw._id = task._id;
        tw.nameOfUser = userObj.name;
        tw.user = task.user;
        tw.title = task.title;
        tw.description = task.description;
        tw.createdAt = Moment(task.createdAt).format('MMMM dddd Do YYYY, HH:mm');
        tasksView.push(tw);
      });
      const tasksViewJson = JSON.stringify(tasksView);
      console.log('TaskView: ' + tasksViewJson);
      console.log('after await tasks');
      res.json(tasksView);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  } catch (e) {
    console.log(e);
  }
}

export async function getAllTasks(req: Request, res: Response): Promise<Response | void> {
  try {
    try {
      Moment.locale('en');
      let tw: any = null;
      let tasksView: Array<ITaskViewSchema>;
      tasksView = [];
      let nameOfUser: any = null;
      let FcreatedAt: any = null;
      const tasks = await Task.find();
      const users = await User.find();
      tasks.forEach((task: any) => {
        tw = {} as ITaskViewSchema;
        users.map((user: any) => {
          if (user._id.toString() == task.user.toString()) {
            nameOfUser = user.name;
          }
        });
        tw._id = task._id;
        tw.nameOfUser = nameOfUser;
        tw.user = task.user;
        tw.title = task.title;
        tw.description = task.description;
        tw.createdAt = Moment(task.createdAt).format('MMMM dddd Do YYYY, HH:mm');
        tasksView.push(tw);
      });

      if (!tasksView) throw Error('No users exist');
      console.log('TaskViewJson: ' + JSON.stringify(tasksView));
      res.json(tasksView);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  } catch (e) {
    console.log(e);
  }
}

export async function createTask(req: any, res: Response): Promise<Response | void> {
  try {
    console.log('CreateTask req.data= ' + JSON.stringify(req.data));
    console.log('CreateTask req.body= ' + JSON.stringify(req.body));
    console.log('CreateTask req.user' + JSON.stringify(req.user));
    // res.status(200).json(req.body);
    let tw: any = null;
    tw = {} as ITaskViewSchema;
    const title = req.body.title;
    const user = req.user.id;
    const description = req.body.description;
    let resTask = await Task.create({ user, title, description });
    tw._id = resTask._id;
    tw.nameOfUser = req.user.name;
    tw.user = user;
    tw.title = title;
    tw.description = description;
    tw.createdAt = Moment(Date.now()).format('MMMM dddd Do YYYY, HH:mm');
    console.log('response: ' + JSON.stringify(resTask));
    resTask = tw;
    res.status(200).json({ success: true, data: { resTask } });
  } catch (e) {
    console.log(e);
  }
}
export async function updateTask(req: Request, res: Response): Promise<Response | void> {
  try {
    try {
      const task = await Task.findByIdAndUpdate(req.params.Id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!task) throw Error('No item found');
      res.status(200).json({ success: true, data: { task } });
    } catch (e) {
      res.status(404).json({ msg: e.message, success: false });
    }
  } catch (e) {
    console.log(e);
  }
}
export async function updateMyTask(req: any, res: Response): Promise<Response | void> {
  try {
    try {
      let task: any = await Task.findById(req.params.Id);

      if (!task) throw Error('No item found');
      console.log('userId= ' + req.user.id);
      console.log('task.user = ' + task.user);
      if (req.user.id != task.user) {
        return res.status(403).json({ msg: 'You do not have permission to perform this action' });
      }
      task = await Task.findByIdAndUpdate(req.params.Id, req.body, {
        new: true,
        runValidators: true,
      });

      res.status(200).json({ success: true, data: { task } });
    } catch (e) {
      res.status(404).json({ msg: e.message, success: false });
    }
  } catch (e) {
    console.log(e);
  }
}
export async function deleteTask(req: Request, res: Response): Promise<Response | void> {
  try {
    try {
      console.log('run delete task');
      console.log('param = ' + JSON.stringify(req.params.Id));

      const task = await Task.findById(req.params.Id);
      if (!task) throw Error('No item found');

      const removed = await task.remove();
      if (!removed) throw Error('Something went wrong while trying to delete the task');

      res.status(200).json({ success: true });
    } catch (e) {
      res.status(400).json({ msg: e.message, success: false });
    }
  } catch (e) {
    console.log(e);
  }
}
export async function deleteMyTask(req: any, res: Response): Promise<Response | void> {
  try {
    try {
      let task: any = await Task.findById(req.params.Id);

      if (!task) throw Error('No item found');
      if (req.user.id != task.user) {
        return res.status(403).json({ msg: 'You do not have permission to perform this action' });
      }
      const removed = await task.remove();
      if (!removed) throw Error('Something went wrong while trying to delete the task');

      res.status(200).json({ success: true });
    } catch (e) {
      res.status(400).json({ msg: e.message, success: false });
    }
  } catch (e) {
    console.log(e);
  }
}
