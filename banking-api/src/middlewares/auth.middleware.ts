import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
    user?: { id: number };
}

export const authMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const token = req.cookies?.token;
    if(!token) return res.status(401).json({ message: "You are not allowed to access!" });

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { sub: number | any };
        req.user = { id: decoded.sub };
        next();
    } catch {
        return res.status(401).json({message: "Session Expired, Please Login Again"});
    }
}