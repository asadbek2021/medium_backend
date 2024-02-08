import { Router } from 'express';
import { PostService } from './post.service';

const router = Router();

router.get('/', PostService.getPostsByPage);
router.get('/by/:id', PostService.getPostById);
router.get('/all', PostService.getAllPosts);
router.post('/', PostService.createPost);
router.post('/rate/:id', PostService.ratePost);

export default router;
