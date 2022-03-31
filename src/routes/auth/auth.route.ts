import express from 'express';
import { loginController } from '../../controllers/auth/auth.controller';

export const authRouter = express.Router();

authRouter.post('/login', loginController)
