import {Request, Response, NextFunction} from 'express'
import { verify } from 'jsonwebtoken'
import { authConfig } from '../config/auth'
import {AppError} from '../utils/appError'
import { log } from 'node:console'

interface tokenPayLoad{
    role: string,
    sub: string,
}

function ensureAuthenticated(request: Request, response:Response, next:NextFunction){
    try {
        const authHeader = request.headers.authorization
        
        
        

        if(!authHeader){
            throw new AppError("JWT token invalid")
        }
        
        const [, token] = authHeader.split(" ")

        
        
        const {role, sub: user_id} = verify(token, authConfig.jwt.secret) as tokenPayLoad

        request.user = {
            id: user_id,
            role,
        }

        return next()



    } catch (error) {
        throw new AppError("JWT token invalid!")
    }
}

export{ensureAuthenticated}