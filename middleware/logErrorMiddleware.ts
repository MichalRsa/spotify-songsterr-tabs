import { NextFunction, Request, Response } from 'express';

const logErrorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.response) {
    console.log(err.response.data);
    console.log(err.response.status);
    console.log(err.response.headers);
  } else if (err.request) {
    console.log(err.request);
  } else {
    console.log('Error', err.message);
  }
  next(err);
};

export default logErrorMiddleware;
