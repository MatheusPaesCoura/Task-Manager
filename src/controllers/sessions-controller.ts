import { Request, Response} from "express";
import z from 'zod'
import { AppError } from "../utils/appError";
import { ensureAuthenticated } from "../middlewares/ensure-authenticated";
import {compare} from 'bcrypt'
import { prisma } from "../database/prisma";
import { authConfig } from "../config/auth";
import { sign } from "jsonwebtoken";


class SessionsController{
    async create(request: Request, response:Response){
        console.log(request.body);
        
        const bodySchema = z.object({
            email: z.string().email(),
            password: z.string().min(6)
        })


        const {email, password} = bodySchema.parse(request.body)
        const user = await prisma.user.findFirst({
            where: {email}
        })

        if (!user){
            throw new AppError("email or password invalid", 401)
        }

        const passwordMatched = await compare(password, user.password)

        if (!passwordMatched){
            throw new AppError("email or password invalid", 401)
        }

        const {secret, expiresIn} = authConfig.jwt

        const token = sign({role: user.role ?? "admin"}, secret, {
            subject: user.id,
        })
        
        const {password: hashedPassword, ...userWithoutPassword} = user

        return response.json({token, user: userWithoutPassword})

    }
}

export {SessionsController}