import { Model } from "sequelize";

import { User } from "../user/user";

export class Post extends Model {
   declare id: number;
   declare title: string;
   declare content: string;
   declare author: User;
}
   
