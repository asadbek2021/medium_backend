import { User } from '../../entities/user';

export {};

declare global {
  namespace Express {
    export interface Request {
      user: User;
    }
  }
}
