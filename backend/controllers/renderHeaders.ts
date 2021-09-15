import { NextFunction, Request, Response } from 'express';

const renderHeaders = (req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT, PATCH, DELETE'
  );
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, auth-token, access-control-allow-origin'
  );
  next();
};

export default renderHeaders;
