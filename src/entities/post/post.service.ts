import {Request, Response, NextFunction} from 'express';
import { PostModel } from './post.model';

const POSTS_PER_PAGE = 6;

type RequestWithQuery = Request & {
    query: {
        currentPage: number;  
    }
}

export class PostService {
    private moduleName = 'PostService'

    static async getPostsByPage(req: RequestWithQuery, res: Response, next: NextFunction) {

    const totalPostsCount = await PostModel.count();
    const pageCount = totalPostsCount !== 0 ? Math.ceil(totalPostsCount / POSTS_PER_PAGE) : 0;
    const currentPage = req.query.currentPage || 1;
        if(currentPage > pageCount) {
            return res.redirect('/notFound')
        }
    }

    static async getAllPosts(req: Request,res: Response, next: NextFunction) {
        return PostModel.findAll({limit: 5});
    }

    
}