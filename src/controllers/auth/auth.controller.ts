import { baseController } from '../base.controller';
import { BaseRequest } from '../../requests/request';

export const loginController = baseController(async (req: BaseRequest) => {
  const { email, password } = req.body;
  console.log(email, password);
})
