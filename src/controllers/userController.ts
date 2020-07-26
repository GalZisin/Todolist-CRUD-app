import { Request, Response } from 'express';
import User from '../models/User';

export async function getAllUsers(
  req: Request,
  res: Response
): Promise<Response | void> {
  try {
    try {
      const users = await User.find();
      if (!users) throw Error('No users exist');
      res.json(users);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  } catch (e) {
    console.log(e);
  }
}

export async function loadUser(
  req: any,
  res: Response
): Promise<Response | void> {
  try {
    try {
      console.log('loadUser... ' + req.user.role);
      res.json(req.user);
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  } catch (e) {
    console.log(e);
  }
}
