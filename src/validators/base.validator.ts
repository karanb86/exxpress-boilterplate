import Validator from 'validatorjs';
import { HttpException } from '../exceptions/commons/http.exception';

/**
 * Docs: https://www.npmjs.com/package/validatorjs
 */
export class BaseValidator {
  validatorException: HttpException = null;

  static validate = async (req: any, rules: {}, customMessages: {}) =>
    new Promise<void>((resolve, reject) => {
      const data = { ...req.body, ...req.query, ...req.params };
      const validator = new Validator(data, rules, customMessages);
      validator.fails(() => {
        reject(validator.errors);
      });
      validator.passes(() => {
        resolve();
      });
    });

  rules() {
    return {};
  }

  customMessages() {
    return {};
  }
}
