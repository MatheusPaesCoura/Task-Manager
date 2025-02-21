import { Request, Response, NextFunction } from "express";
import {AppError} from '../utils/appError'

function verifyAuthorization (role: string[]){
    return (request: Request, response: Response, next: NextFunction) => {

        console.log(request.user)
        
        if(!request.user){
         throw new AppError("Unauthorized", 401)   
        }
        if(!role.includes(request.user.role)){
            throw new AppError("Unauthorized", 401)
        }

        return next()
    }
}

export {verifyAuthorization}