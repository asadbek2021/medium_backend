import { Model } from 'sequelize';

export class Post extends Model {
  declare id: number;
  declare title: string;
  declare content: string;
  declare authorId: number;
  declare rating: Rating | null;
}

export const enum Rating {
  One_Star = 1,
  Two_Star,
  Three_Star,
  Four_Star,
  Five_Star,
}
