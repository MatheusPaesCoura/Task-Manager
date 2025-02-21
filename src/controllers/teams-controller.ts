import { Request, Response } from "express";
import z from 'zod'
import {AppError} from '../utils/appError'
import { prisma } from "../database/prisma";

class TeamsController {
    async create(request: Request, response: Response){
        const bodySchema = z.object({
            name: z.string().trim(),
            description: z.string(),
        })
    
            const { name, description } = bodySchema.parse(request.body);

            const teamWithSameName = await prisma.team.findFirst({
                where: { name }
            });

            if (teamWithSameName) {
                throw new AppError("Team with this name already exists!", 400);
            }

            const team = await prisma.team.create({
                data: {
                    name,
                    description
                }
            });

            return response.status(201).json({ message: "Team created successfully", team });

    }
}

export { TeamsController };