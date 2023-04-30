import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'sequelize';

import { PostModel } from './post.model';
import { User, UserModel } from '../user';
import { HttpError, POST_SCHEMA } from '../../utils';
import { Post, Rating } from './post';

const POSTS_PER_PAGE = 6;

type RequestWithQuery = Request & {
  query: {
    currentPage: number;
    rate: number;
  };
};

const includeAuthorQuery = {
  include: {
    as: 'user',
    model: UserModel,
  },
};

export class PostService {
  static async getPostsByPage(
    req: RequestWithQuery,
    res: Response,
    next: NextFunction
  ) {
    try {
      const totalPostCount = await PostModel.count();
      if (totalPostCount === 0) {
        return res.send({});
      }
      const pageCount =
        totalPostCount !== 0 ? Math.ceil(totalPostCount / POSTS_PER_PAGE) : 0;
      const currentPage =
        !isNaN(+req.query.currentPage) && +req.query.currentPage > 0
          ? +req.query.currentPage
          : 1;
      if (currentPage > pageCount) {
        return res.redirect('/notFound');
      }
      const offset = currentPage > 1 ? (currentPage - 1) * POSTS_PER_PAGE : 0;
      const limit = POSTS_PER_PAGE;
      const currentPosts = await PostModel.findAll({
        offset,
        limit,
        ...includeAuthorQuery,
      });
      res.send({ currentPosts, currentPage });
    } catch (error) {
      next(error);
    }
  }

  static async getPostById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (id == null && isNaN(+id)) {
        throw new HttpError(400, { message: 'Invalid post identifier' });
      }
      const post = await PostModel.findByPk(id, { ...includeAuthorQuery });
      if (post == null) {
        res.status(404).send({ message: 'No post was found!' });
        return;
      }
      res.send(post || {});
    } catch (error) {
      next(error);
    }
  }

  static async ratePost(
    req: RequestWithQuery,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const { rate } = req.query;
      if (rate == null && !isNaN(rate) && isValidRate(rate)) {
        throw new HttpError(400, { message: 'Invalid rating' });
      }
      if (id == null && isNaN(+id)) {
        throw new HttpError(400, { message: 'Invalid post identifier' });
      }
      const post = await PostModel.findByPk(id);
      if (post == null) {
        res.status(404).send({ message: 'No post was found!' });
        return;
      }
      await post.update({ rating: rate });
      const userPosts = await getUserPosts(post.authorId);
      const userRating = getTotalPostsRating(userPosts);
      const user = (await UserModel.findByPk(post.authorId)) as User;
      await user.update({ rating: userRating });
      res.status(204).send({ message: 'Rated successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async getAllPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const posts = await PostModel.findAll({ ...includeAuthorQuery });
      res.send(posts);
    } catch (error) {
      next(error);
    }
  }

  static async createPost(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, content } = req.body;
      await validatePost(title, content);
      const posts = await PostModel.create({
        title,
        content,
        authorId: req.user.id,
      });
      res.send({ posts });
    } catch (error) {
      next(error);
    }
  }
}

async function validatePost(title: string, content: string) {
  try {
    await POST_SCHEMA.validate({ title, content });
  } catch (error) {
    throw new ValidationError('Post Validation Error', [error]);
  }
}
async function getUserPosts(userId: number): Promise<Post[]> {
  const posts = await PostModel.findAll({ where: { authorId: userId } });
  return posts;
}

function isValidRate(rate: number): boolean {
  return rate > 0 && rate < 6;
}

function getTotalPostsRating(posts: Post[]): number | null {
  const rates = posts.reduce((total, current) => {
    if (current.rating != null) {
      const count = total.get(current.rating);
      total.set(current.rating, count ? count + 1 : 1);
    }
    return total;
  }, new Map<Rating, number>());
  if (rates.size === 0) {
    return null;
  }
  const { rateCount, rateSum } = [...rates].reduce(
    (total, [rate, count]) => {
      total['rateSum'] = total['rateSum'] + rate * count;
      total['rateCount'] = total['rateCount'] + count;
      return total;
    },
    { rateSum: 0, rateCount: 0 }
  );

  return Math.ceil(rateSum / rateCount);
}
