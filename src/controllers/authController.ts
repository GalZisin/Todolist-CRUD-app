import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import bcrypt from 'bcryptjs';
// import dotenv from 'dotenv';

// dotenv.config({ path: './config.env' });
const signToken = (id: any) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user: any, statusCode: any, req: Request, res: Response) => {
  const token = signToken(user._id);

  res.cookie('jwt', token, {
    expires: new Date(Date.now() + Number(`${process.env.JWT_COOKIE_EXPIRES_IN}`) * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  });

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

export async function register(req: Request, res: Response): Promise<Response | void> {
  try {
    const { name, email, password } = req.body;

    // Simple validation
    if (!name || !email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }

    try {
      const user = await User.findOne({ email });
      if (user) throw Error('User already exists');

      const salt = await bcrypt.genSalt(10);
      if (!salt) throw Error('Something went wrong with bcrypt');

      const hash = await bcrypt.hash(password, salt);
      if (!hash) throw Error('Something went wrong hashing the password');

      const newUser = new User({
        name,
        email,
        password: hash,
      });

      const savedUser: any = await newUser.save();
      if (!savedUser) throw Error('Something went wrong saving the user');

      // const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
      //   expiresIn: 3600,
      // });

      createSendToken(savedUser, 201, req, res);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  } catch (e) {
    console.log(e);
  }
}
export async function login(req: Request, res: Response): Promise<Response | void> {
  try {
    const { email, password } = req.body;

    // Simple validation
    if (!email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }

    try {
      // Check for existing user
      const user: any = await User.findOne({ email });
      if (!user) throw Error('User Does not exist');

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw Error('Invalid credentials');
      createSendToken(user, 200, req, res);
      // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      //   expiresIn: 3600,
      // });
      // if (!token) throw Error('Couldnt sign the token');

      // res.status(200).json({
      //   token,
      //   user: {
      //     id: user._id,
      //     name: user.name,
      //     email: user.email,
      //   },
      // });
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  } catch (e) {
    console.log(e);
  }
}

// export async function loadUser(
//   req: Request,
//   res: Response
// ): Promise<Response | void> {
//   try {
//     const { email, password } = req.body;

//     // Simple validation
//     if (!email || !password) {
//       return res.status(400).json({ msg: 'Please enter all fields' });
//     }

//     try {
//       // Check for existing user
//       const user: any = await User.findOne({ email });
//       if (!user) throw Error('User Does not exist');

//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) throw Error('Invalid credentials');
//       createSendToken(user, 200, req, res);

//     } catch (e) {
//       res.status(400).json({ msg: e.message });
//     }
//   } catch (e) {
//     console.log(e);
//   }
// }

export function restrictTo(...roles: any[]) {
  return (req: any, res: Response, next: NextFunction) => {
    // roles ['admin', 'user']. role='user'
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ msg: 'You do not have permission to perform this action' });
    }
    next();
  };
}
