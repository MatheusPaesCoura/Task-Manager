import { Request, Response } from "express";
import z from 'zod'
import { AppError } from "@/utils/appError";
import { prisma } from "@/database/prisma";

class TasksController {


    async create(request: Request, response: Response){
        const bodySchema = z.object({
            name: z.string().trim(),
            description: z.string(),
            assigned_to: z.string().uuid(),
            team_id: z.string().uuid()
        })



        const {name, description, assigned_to, team_id} = bodySchema.parse(request.body)
        await prisma.tasks.create({
            data: {
                name,
                description,
                assignedTo: assigned_to,
                teamId: team_id
            }
        })

        return response.status(201).json()

    }

    async show(request: Request, response: Response){

        const isMember = request.user?.role === "member";
        let whereCondition = {}

        if(isMember){
            const teams = await prisma.teamMember.findMany({
                where: {userId: request.user?.id},
                select: {teamId: true}
            })

            const teamIds = teams.map(team => team.teamId)


            if (teamIds.length === 0) {
                return response.json([]);
            }

            whereCondition = { teamId: {in: teamIds} };

            
            console.log("TESTANDO: ", teamIds);
        }
        
       

        const tasks = await prisma.tasks.findMany({
            where: whereCondition,
            select:{
                name: true,
                description: true,
                status: true,
                priority: true,
                createdAt: true,
                updatedAt: true,
                team: {select: {name: true}},
                assigned: {select: {name: true}},
            }
        })

        

        return response.json(tasks)
    }

    async update(request: Request, response: Response){

        const isMember = request.user?.role === "member";
        const paramsSchema = z.object({
            id: z.string().uuid()
        })

        const bodySchema = z.object({
            status: z.enum(["pending", "in_progress", "completed"]),
            priority: z.enum(["high", "medium", "low"])
        })


        const {id} = paramsSchema.parse(request.params)

        const {status, priority} = bodySchema.parse(request.body)

        const whereCondition = isMember ? { id, assignedTo: request.user?.id} : { id };

        if(!whereCondition){
            throw new AppError("You just can make update in your tasks")
        }

        await prisma.tasks.update({
            data: {
                status,
                priority
            },
            where: whereCondition
        })

        return response.json()
    }
}

export {TasksController}