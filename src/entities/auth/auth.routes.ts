import { Router } from "express";
import { AuthService } from "./auth.service";

const router = Router();

router.post('/signin', AuthService.signIn);
router.get('/signup', AuthService.signUp);

export default router;