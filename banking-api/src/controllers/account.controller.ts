import { Response } from "express";
import { AccountServices } from "../services/account.services";
import { AuthRequest } from "../middlewares/auth.middleware";

const accountServices = new AccountServices();

export class AccountController {

    async getAccounts(req: AuthRequest, res: Response) {
        try{
            const { id } = req.params;
            const accounts = await accountServices.getAccounts(Number(id));
            res.json(accounts);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }

    async getTransactions(req: AuthRequest, res: Response) {
        try{
            const { accountId } = req.params;
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;

            const txns = await accountServices.getTransactions(Number(accountId), page, limit);
            res.json(txns);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }

    async transfer(req: AuthRequest, res: Response) {
        try{
            const {
             fromAccountId,
             beneficiaryAccNo,
             beneficiaryBankName,
             amount,
             description } = req.body;

            const result = await accountServices.transfer(
                                                fromAccountId,
                                                beneficiaryAccNo,
                                                beneficiaryBankName,
                                                amount,
                                                description );
            res.json(result);
        }catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }
}