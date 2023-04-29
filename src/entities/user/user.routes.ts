import { Router } from "express";
import { UserService } from "./user.service";

const router = Router();

router.get('/', UserService.getUsersByPage);
router.get('/all', UserService.getAllUsers);

export default router;