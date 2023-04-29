import { Model } from "sequelize";

import { Post } from "../post";

export class User extends Model {
    declare id: number;
    declare email: string;
    declare password: number;
    declare posts: Post[];
}