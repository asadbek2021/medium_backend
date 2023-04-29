import {Request, Response, NextFunction} from 'express';
import { UserModel } from '../user';

const USERS_PER_PAGE = 12;

type RequestWithQuery = Request & {
    body?: {
        email?: string;
        password?: number;
    }
}

export class AuthService {
    private static moduleName = 'AuthService';

    static signIn(req: RequestWithQuery, res: Response, next: NextFunction) {

    }

    static signUp(req: RequestWithQuery, res: Response, next: NextFunction) {

    }
}