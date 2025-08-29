import { Router } from "express";
import { AccountController } from "../controllers/account.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { transferSchema } from "../validations/account.validation";

const router = Router();
const accountController = new AccountController();

router.get("/:id", authMiddleware, (req, res) => accountController.getAccounts(req, res));
router.get("/:accountId/transactions", authMiddleware, (req, res) => accountController.getTransactions(req, res));
router.post("/transfer", authMiddleware, validate(transferSchema), (req, res) => accountController.transfer(req, res));

export default router;