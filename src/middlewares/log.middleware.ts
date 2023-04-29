import { NextFunction, Request, Response } from 'express';

import {logger } from '../utils';

export function logMiddleware(req: Request, res: Response, next: NextFunction) {
    logger.info({method: res.req?.method, url: res.req?.url, reqBody: res.req?.body || null});
    return next();
}