import { Router } from "express";
import {TasksController} from '@/controllers/tasks-controller'
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyAuthorization } from "@/middlewares/verifyAuthorization";

const tasksRoutes = Router()
const tasksController = new TasksController()

tasksRoutes.post(
    "/",
    ensureAuthenticated,
    verifyAuthorization(["admin"]),
    tasksController.create
)

tasksRoutes.get(
    "/",
    ensureAuthenticated,
    verifyAuthorization(["admin", "member"]),
     tasksController.show
)

tasksRoutes.put(
    "/:id/show",
    ensureAuthenticated,
    verifyAuthorization(["admin", "member"]),
    tasksController.update
)

export {tasksRoutes}