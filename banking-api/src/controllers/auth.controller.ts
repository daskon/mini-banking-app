import { Request, Response } from "express";
import { AuthService } from "../services/auth.services";

const authService = new AuthService();

export class AuthController {

    async login(req: Request, res: Response) {
        try{
            const {username, password} = req.body;
            const result = await authService.login(username,password);
            res.json(result);
        } catch (err: any) {
            res.status(400).json({ error: err.message});
        }
    }
}