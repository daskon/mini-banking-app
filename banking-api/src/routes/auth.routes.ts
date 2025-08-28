import Router from "express";
import { AuthController } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate.middleware";
import { loginSchema } from "../validations/auth.validation";

const router = Router();
const authController = new AuthController();

router.post('/login', validate(loginSchema), (req, res) => authController.login(req,res));

export default router;