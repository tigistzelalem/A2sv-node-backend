import { Router } from 'express';
import { signin, signup } from '../controllers/user_controller';
const router = Router();


router.post("/auth/signup", signup);
router.post("/auth/signin",  signin);

export default router;
