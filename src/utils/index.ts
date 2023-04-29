
type ErrorBody = {message: string, [key:string]:any}

export class HttpError extends Error {

     statusCode: number;
     body: ErrorBody;

    constructor(statusCode: number, body: ErrorBody) {
        super(body.message);
        this.name = 'HTTP Error';
        this.statusCode = statusCode;
        this.body = body;
    }

}

export * from './logger';
export * from './validation';