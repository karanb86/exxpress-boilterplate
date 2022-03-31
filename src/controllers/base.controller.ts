import { NextFunction, Request, Response } from 'express';
import { BaseValidator } from '../validators/base.validator';
import { errorHandler } from '../utils/error-handler.util';
import { dbService } from '../services/database.service';
import { ModelNotFoundException } from '../exceptions/commons/model-not-found.exception';
import { BaseRequest } from '../requests/request';

export function baseController(
  method: any,
  validator: BaseValidator = null,
  createInstanceFromId = true
) {
  const handler = async (req: Request, res: Response, next: NextFunction) => {
    if (validator) {
      try {
        await BaseValidator.validate(
          req,
          validator.rules(),
          validator.customMessages()
        );
      } catch (e) {
        return res.status(422).json({
          message: e.message,
          errors: e.errors,
        });
      }
    }
    const request = new BaseRequest(req);
    const instances = createInstanceFromId
      ? await fetchEntityFromId(request)
      : [];
    const response = await method.apply(null, [
      ...instances,
      request,
      res,
      next,
    ]);
    return res.json(response);
  };

  return errorHandler(handler);
}

async function fetchEntityFromId(request: BaseRequest) {
  const instances = [];
  const params = request.params;
  const paramKeys = Object.keys(params);
  for (const key in paramKeys) {
    const param = paramKeys[key];
    const modelName = param.charAt(0).toUpperCase() + param.slice(1);
    const model = dbService.getModel(modelName);
    if (!model) {
      continue;
    }
    const options = {
      where: { id: params[param] },
    } as any;
    if (request.include) {
      options.include = request.include;
    }
    const instance = await model.findOne(options);
    if (!instance) {
      throw new ModelNotFoundException(
        `${param} with id:${params[param]} doesn't exists.`
      );
    }
    instances.push(instance);
  }
  return instances;
}
