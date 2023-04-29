import {Request, Response, NextFunction} from 'express';
import { UserModel } from './user.model';
import { PostModel } from '../post/post.model';

const USERS_PER_PAGE = 12;

type RequestWithQuery = Request & {
    query: {
        currentPage: number;  
    }
}

export class UserService {
    private moduleName = 'UserService'

    static async getUsersByPage(req: RequestWithQuery, res: Response, next: NextFunction) {
       try{
        const totalUsersCount = await UserModel.count();
        const pageCount = totalUsersCount !== 0 ? Math.ceil(totalUsersCount / USERS_PER_PAGE) : 0;
        const currentPage = !isNaN(req.query.currentPage) &&  req.query.currentPage || 1;
        if(currentPage > pageCount) {
            return res.redirect('/notFound')
        }
        const offset = currentPage > 1 ? (currentPage - 1) *  USERS_PER_PAGE : 0;
        const limit = USERS_PER_PAGE;
        const currentUsers = UserModel.findAll({
            offset,
            limit
        })
        res.send({currentUsers, currentPage})
       } catch(error) {
            next(error);
       }
    }

    static async getAllUsers(req: Request,res: Response, next: NextFunction) {
        try{
            const users =  await UserModel.findAll({include: PostModel});
            res.send({users})
        } catch(error) {
            next(error);
        }
    }

    
}