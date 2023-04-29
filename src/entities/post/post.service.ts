import {Request, Response, NextFunction} from 'express';
import { PostModel } from './post.model';
import { User, UserModel } from '../user';
import { HttpError, POST_SCHEMA } from '../../utils';
import { ValidationError } from 'sequelize';

const POSTS_PER_PAGE = 6;

type RequestWithQuery = Request & {
    query: {
        currentPage: number;  
    }
}

const includeAuthorQuery = {
    include: {
        as: 'user',
        model: UserModel
    }
}

export class PostService {

    static async getPostsByPage(req: RequestWithQuery, res: Response, next: NextFunction) {
        try{
            const totalPostCount = await PostModel.count();
            if(totalPostCount === 0) {
                return res.send({});
            }
            const pageCount = totalPostCount !== 0 ? Math.ceil(totalPostCount / POSTS_PER_PAGE) : 0;
            const currentPage = !isNaN(+req.query.currentPage) && +req.query.currentPage > 0 ? +req.query.currentPage : 1;
            if(currentPage > pageCount) {
                return res.redirect('/notFound')
            }
            const offset = currentPage > 1 ? (currentPage - 1) *  POSTS_PER_PAGE : 0;
            const limit = POSTS_PER_PAGE;
            const currentPosts = await PostModel.findAll({
                offset,
                limit,
                ...includeAuthorQuery
            })
            res.send({currentPosts, currentPage})
           } catch(error) {
                next(error);
           }
    }

    static async getPostById(req: Request,res: Response, next: NextFunction) {
        try{
            const { id } = req.params;
            if(id == null && isNaN(+id)) {
                throw new HttpError(400, {message: 'Invalid post identifier'})
            }
            const post = await PostModel.findByPk(id,{...includeAuthorQuery});
            if(post == null){
                res.status(404).send({message: 'No post was found!'});
                return;
            }
            res.send(post || {});
        } catch(error) {
            next(error);
        }
    }

    static async getAllPosts(req: Request,res: Response, next: NextFunction) {
        try{
            const posts = await PostModel.findAll({...includeAuthorQuery});
            res.send(posts)
        } catch(error) {
            next(error);
        }
    }

    static async createPost(req: Request,res: Response, next: NextFunction) {
        try{
            const { title, content } = req.body;
            await validatePost(title, content);
            // @ts-ignore
            const posts = await PostModel.create({title, content, authorId: req.user.id});
            res.send({posts})
        } catch(error) {
            next(error);
        }
    }
    // static async deletePost(req: Request,res: Response, next: NextFunction) {
    //     try{
    //         const posts = await PostModel.find({});
    //         res.send({posts})
    //     } catch(error) {
    //         next(error);
    //     }
    // }
    
}

async function validatePost(title: string, content: string) {
    try{
       await POST_SCHEMA.validate({title, content});
    } catch(error) {
        throw new ValidationError('Post Validation Error',[error]);
    }
}