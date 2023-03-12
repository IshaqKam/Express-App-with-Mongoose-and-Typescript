import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { NextFunction, Request, RequestHandler, Response } from 'express';

import { HttpException } from 'exceptions/HttpException';

const validationMiddleware = (
  type: any,
  value: string | 'body' | 'query' | 'params' = 'body',
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = true
): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    validate(plainToClass(type, req[value]), {
      skipMissingProperties,
      whitelist,
      forbidNonWhitelisted,
    }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        if (!errors[0].constraints) {
          let messag;
          errors.map((error: ValidationError) => {
            error.children.map((child) => {
              messag = child.children
                .map((e) => {
                  Object.values(e.constraints);
                })
                .join(', ');
            });
          });
          console.log(messag);
          next(new HttpException(400, messag));
        } else {
          const message = errors
            .map((error: ValidationError) => Object.values(error.constraints))
            .join(', ');
          next(new HttpException(400, message));
        }
      } else {
        next();
      }
    });
  };
};

export default validationMiddleware;
