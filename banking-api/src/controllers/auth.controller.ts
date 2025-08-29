import { Request, Response } from "express";
import { AuthService } from "../services/auth.services";

const authService = new AuthService();

export class AuthController {

    async login(req: Request, res: Response) {
        try{
            const {username, password} = req.body;
            const result = await authService.login(username,password);

            res.cookie("token", result.token, {
                httpOnly: true,
                secure: false, //process.env.NODE_ENV === "production",
                sameSite: "lax", //"strict",
                maxAge: 10 * 60 * 1000,
            });
            res.json({user: result.user});
        } catch (err: any) {
            res.status(400).json({ error: err.message});
        }
    }

    async logout(req: Request, res: Response) {
        try {
            res.clearCookie("token", {
                httpOnly: true,
                secure: false,
                sameSite: "none",
            });
            res.json({ message: "Logged out successfully" });
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }

}