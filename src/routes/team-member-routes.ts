import { TeamMembersController } from "@/controllers/team-members-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyAuthorization } from "@/middlewares/verifyAuthorization";
import { Router } from "express";

const teamMembersRoutes = Router()
const teamMembersController = new TeamMembersController()

teamMembersRoutes.post(
    "/",
    ensureAuthenticated,
    verifyAuthorization(["admin"]),
    teamMembersController.create
)

teamMembersRoutes.patch(
    "/:id",
    ensureAuthenticated,
    verifyAuthorization(["admin"]),
    teamMembersController.update
)

teamMembersRoutes.delete(
    "/:id",
    ensureAuthenticated,
    verifyAuthorization(["admin"]),
    teamMembersController.remove
)

export {teamMembersRoutes}