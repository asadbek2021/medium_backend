import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

import * as Config from '../../config';
import { UserModel } from '../user';
import { ValidationError } from 'sequelize';
import { USER_SCHEMA } from '../../utils/validation';
import { HttpError } from '../../utils';


type RequestWithQuery = Request & {
    body?: {
        email?: string;
        password?: number;
    }
}

export class AuthService {

    static async signIn(req: RequestWithQuery, res: Response, next: NextFunction) {
        try{
            const {email, password} = req.body;
            await validateUser(email, password);
            const user = await UserModel.findOne({where:{ email }});
            if(user == null){
                throw new HttpError(400, {message: 'User doesn\'t exist'})
            }
            const token = generateToken({id: user.id}, Config.JWT_SECRET)
            res.status(200).send({message: 'Singned in successfully!', token});
        } catch(error) {
            next(error);
        }
    }

    static async signUp(req: RequestWithQuery, res: Response, next: NextFunction) {
        try{
            const {email, password} = req.body;
            await validateUser(email, password);
            const user = await UserModel.findOne({where: {email}});
            if(user != null){
                throw new HttpError(400, {message: 'User already exists'})
            }
            const newUser =  await UserModel.create({email, password})
            res.status(201).send({message: 'Signed up successfully!' ,user: newUser});
        } catch(error) {
            next(error);
        }
    }
}

async function validateUser(email: string, password: number | string) {
    try{
       await USER_SCHEMA.validateAsync({email, password})
    } catch(error) {
        throw new ValidationError('User validation error', [error]);
    }
}

function generateToken(payload: any, secret: string) {
    const token = jwt.sign(payload, secret, {expiresIn: '2h'});
    return token;
}

