import { prisma } from '../database/prisma'
import {Request, Response} from 'express'
import {z} from 'zod'
import {AppError} from '../utils/appError'
import { Hash } from 'crypto'
import { hash } from 'bcrypt'

class UsersController {
    async create (request: Request, response: Response){
        const bodySchema = z.object({
            name: z.string().trim().min(2),
            email: z.string().email(),
            password: z.string().min(6)
        })
        const {name, email, password} = bodySchema.parse(request.body)

        const userWithSameEmail = await prisma.user.findFirst({where: {email}})
        
        if(userWithSameEmail){
            throw new AppError("user with same email already exist")
        }
        
        const hashedPassword = await hash(password, 8)
        

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            },
        })

        const {password: _, ...userWithoutPassword} = user


        return response.status(201).json(userWithoutPassword)
    }
}

export {UsersController}