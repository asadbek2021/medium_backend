import {Router} from "express";
import { PostService } from "./post.service";
import { EmptyResultError } from "sequelize";

const router = Router();

router.get('/', PostService.getPostsByPage);
router.get('/all', PostService.getAllPosts);

export default router;