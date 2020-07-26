import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User';
// import config from '../config';
// const { JWT_SECRET } = config;

dotenv.config({ path: './config.env' });

export default async (req: any, res: Response, next: NextFunction) => {
  let token: any;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    console.log(JSON.stringify(req.headers.authorization));
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    console.log('cookies token');
    token = req.cookies.jwt;
  }

  // const token = req.header('x-auth-token');
  console.log('token =  ' + token);
  // Check for token
  if (!token) return res.status(401).json({ msg: 'No token, authorizaton denied' });

  try {
    // Verify token
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        msg: 'The user belonging to this token does no longer exist.',
      });
    }

    // Add user from payload
    req.user = currentUser;
    console.log(JSON.stringify(req.user));
    next();
  } catch (e) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
};
