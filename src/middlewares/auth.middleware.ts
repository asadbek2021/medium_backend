import { Request,Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

import * as Config from '../config';
import { UserModel } from '../entities/user';
import { HttpError } from '../utils';


type Payload = {
    id: string
}


export async function authMiddleware(req: Request, res: Response, next: NextFunction){
    const token = (req.headers['authorization'] || '').replace('Bearer ', '');
    try{
        const payload = getVerifiedToken(token, Config.JWT_SECRET);
        const user = await UserModel.findOne({where: { id: +payload['id'] }});
        if(user == null) {
            throw new HttpError(401, {message: 'Non-authorized request'});
        }
        // @ts-ignore
        req.user = user;
        next();
    } catch(err){
        next(err);
    }
}

function getVerifiedToken(token: string, secret: string): {id: string} {
    try{
        const decode = jwt.verify(token, secret);
        return decode as Payload;
    } catch(error) {
        throw new HttpError(403, {message: 'Invalid token'})
    }
}