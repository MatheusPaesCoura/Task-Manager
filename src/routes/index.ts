import { Router } from "express";
import { usersRoutes } from "./users-routes";
import { sessionRoutes } from "./sessions-routes";
import { teamsRoutes } from "./teams-routes";
import {tasksRoutes} from '@/routes/tasks-routes'
import { teamMembersRoutes } from "./team-member-routes";

const routes = Router()

routes.use("/users", usersRoutes)
routes.use("/session", sessionRoutes)
routes.use("/teams", teamsRoutes)
routes.use("/tasks", tasksRoutes)
routes.use("/team-members", teamMembersRoutes)


export {routes}