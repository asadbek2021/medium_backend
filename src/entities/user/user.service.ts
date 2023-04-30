import { Request, Response, NextFunction } from 'express';
import { UserModel } from './user.model';
import { PostModel } from '../post/post.model';
import { HttpError } from '../../utils';

const USERS_PER_PAGE = 6;

type RequestWithQuery = Request & {
  query: {
    currentPage: number;
  };
};

export class UserService {
  static async getUsersByPage(
    req: RequestWithQuery,
    res: Response,
    next: NextFunction
  ) {
    try {
      const totalUsersCount = await UserModel.count();
      if (totalUsersCount === 0) {
        return res.send({});
      }
      const pageCount =
        totalUsersCount !== 0 ? Math.ceil(totalUsersCount / USERS_PER_PAGE) : 0;
      const currentPage =
        !isNaN(+req.query.currentPage) && +req.query.currentPage > 0
          ? +req.query.currentPage
          : 1;
      if (currentPage > pageCount) {
        return res.redirect('/notFound');
      }
      const offset = currentPage > 1 ? (currentPage - 1) * USERS_PER_PAGE : 0;
      const currentUsers = await UserModel.findAll({
        limit: USERS_PER_PAGE,
        offset,
      });
      res.send({ currentUsers, currentPage });
    } catch (error) {
      next(error);
    }
  }

  static async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserModel.findAll({ include: PostModel });
      res.send({ users });
    } catch (error) {
      next(error);
    }
  }

  static async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (id == null && isNaN(+id)) {
        throw new HttpError(400, { message: 'Invalid user identifier' });
      }
      const user = await UserModel.findByPk(id, { include: PostModel });
      if (user == null) {
        res.status(404).send({ message: 'No user was found!' });
        return;
      }
      res.send(user || {});
    } catch (error) {
      next(error);
    }
  }
}
