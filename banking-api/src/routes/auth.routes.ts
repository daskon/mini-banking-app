import Router from "express";
import { AuthController } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate.middleware";
import { loginSchema } from "../validations/auth.validation";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
const authController = new AuthController();

router.post('/login', validate(loginSchema), (req, res) => authController.login(req,res));
router.get('/me', authMiddleware, (req: any, res) =>{
    res.json({user: req.user});
});

export default router;