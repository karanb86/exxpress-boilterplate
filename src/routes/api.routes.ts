import express, { Request, Response, NextFunction } from 'express';
import { errorHandler } from '../utils/error-handler.util';
import { RouteNotFoundException } from '../exceptions/commons/route-not-found.exception';
import { authRouter } from './auth/auth.route';

const router = express.Router();

router.get('/test', (req, res) => {
  res.send({response: 'OK'});
})

const checkAPIDomain = (req: Request, res: Response, next: NextFunction) => {
  const { host } = req.headers;
  next();
};

// router.use('*', [checkAPIDomain]);

router.use('/auth', authRouter);

// router.all(
//   '*',
//   errorHandler(() => {
//     throw new RouteNotFoundException();
//   })
// );

export const apiRoutes = router;
