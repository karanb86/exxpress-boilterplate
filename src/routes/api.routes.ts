import express, { Request, Response, NextFunction } from 'express';

const router = express.Router();

router.get('/test', (req, res) => {
  res.send({response: 'OK'});
})

export const apiRoutes = router;
