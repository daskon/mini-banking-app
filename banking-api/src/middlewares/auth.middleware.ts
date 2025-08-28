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
    const header = req.headers["authorization"];
    if(!header) return res.status(401).json({ message: "You are not allowed to access!" });

    const token = header.split(" ")[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { sub: number | any };
        req.user = { id: decoded.sub };
        next();
    } catch {
        return res.status(401).json({message: "Session Expired, Please Login Again"});
    }
}