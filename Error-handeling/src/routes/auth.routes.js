import { Router } from "express";
import { registerController } from "../controller/auth.controller.js";
import { registerValidation } from "../validation/auth.validate.js";

const authRouter = Router();

authRouter.post('/register', registerValidation ,registerController)

export default authRouter;