import { Request, Response } from "express";
import z, { string } from 'zod'
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/appError";
import { log } from "console";

class TeamMembersController {
    async create(request: Request, response: Response){
        const bodySchema = z.object({
            userId: z.string().uuid(),
            teamId: z.string().uuid()            
        })

        const {userId, teamId} = bodySchema.parse(request.body)

        const userExist = prisma.user.findUnique({where: {id: userId}})
        const teamExist = prisma.team.findUnique({where: {id: teamId}})

        if(!userExist){
            throw new AppError("User not found")
        }

        if(!teamExist){
            throw new AppError("Team not found")
        }

        await prisma.teamMember.create({
            data: {
                userId,
                teamId
            }
        })


        return response.status(201).json()

    }

    async update(request: Request, response: Response){
        const paramsSchema = z.object({
            id: z.string().uuid()
        })
        const bodySchema = z.object({
            userId: z.string().uuid()
        })

        const {id: teamId} = paramsSchema.parse(request.params)
        const {userId} = bodySchema.parse(request.body)

        const existingMember = await prisma.teamMember.findFirst({
            where: {
                userId,
                teamId
            }
        })

        if(existingMember) {
            throw new AppError("User is already in the team")
        }

        await prisma.teamMember.create({
            data: {
                teamId, 
                userId
            }
        })

        return response.status(200).json("User Add to the team")
        
    }

    async remove(request: Request, response: Response){
        const paramsSchema = z.object({ 
            id: z.string().uuid()
        })

        const bodySchema = z.object({
            userId: z.string().uuid()
        })

        const {id: teamId} = paramsSchema.parse(request.params)
        const {userId} = bodySchema.parse(request.body)

        const existingMember = await prisma.teamMember.findFirst({
            where: {
                userId,
                teamId
            }
        })

        if(!existingMember){
            throw new AppError("User isn't on the team")
        }

        await prisma.teamMember.deleteMany({
            where: {
                teamId,
                userId
            }
        })

        return response.json()
    }
}

export {TeamMembersController}