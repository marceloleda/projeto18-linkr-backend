import { Router } from "express";
import { likesController } from "../controllers/likes.controller";

const likesRouter = Router()

likesRouter.post('/likes',/*inserirMiddleware*/ likesController)


export default likesRouter