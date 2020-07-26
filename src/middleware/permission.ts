import { Response, Request, NextFunction } from 'express';

export default function restrictTo(...roles: string[]) {
  return (req: any, res: Response, next: NextFunction) => {
    // roles ['admin', 'user']. role='user'
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ msg: 'You do not have permission to perform this action' });
    }
    next();
  };
}
