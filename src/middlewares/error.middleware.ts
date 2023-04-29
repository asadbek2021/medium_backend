import {Request, Response, NextFunction } from 'express';
import {ValidationError} from 'joi'; 

import { HttpError, logger } from '../utils';

type ErrorType = Error | HttpError | ValidationError;

export function errorMiddleware(error: ErrorType, req: Request, res: Response, next: NextFunction) {
    process.on('uncaughtException', (err: Error)=> {
        logger.error(err);
        res.status(500).send({message: 'Internal server error'});
        process.exit(1);
    });
    process.on('unhandledRejection', (err: Error)=> {
        logger.error(err);
        res.status(500).send({message: 'Internal server error'});
        process.exit(1);
    });

    if( error instanceof HttpError){
        logger.error(error);
        res.status(error?.statusCode).send({message: error.message});
        return;
    }
    if(error instanceof ValidationError){
        logger.error(error);
        res.status(400).send({message: error.message, details: error.details});
        return;
    }
    logger.error(error);
    res.status(500).send({message: error.message})
    return;
}