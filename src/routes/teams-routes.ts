import {TeamsController} from '../controllers/teams-controller'
import { Router } from 'express'
import {ensureAuthenticated} from '../middlewares/ensure-authenticated'
import {verifyAuthorization} from '../middlewares/verifyAuthorization'



const teamsRoutes = Router()
const teamsController = new TeamsController()

teamsRoutes.post(
    "/",
    ensureAuthenticated,
    verifyAuthorization(["admin"]),
    teamsController.create)

export {teamsRoutes}