import { User } from "../user/user";

export interface Post {
    id: number;
    title: string;
    content: string;
    author: User;
}
   
