import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export class AuthService {

    async login (username: string, password: string) {
        const user = await prisma.user.findUnique({ where: {username }});
        if(!user) throw new Error("User not found");

        const valid = await bcrypt.compare(password, user.password);
        if(!valid) throw new Error("Invalid credtials");

        const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET!, {
            expiresIn: "5m",
        });

        return { token, userId: user.id };
    }
}