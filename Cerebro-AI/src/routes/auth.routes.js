import { Router } from "express";
import { getMeController, loginController, registerController, verifyEmail } from "../controllers/auth.controller.js";
import { loginValidation, registerValidation } from "../validators/auth.validator.js";
import { verifyUser } from "../middleware/auth.middleware.js";

const authRouter = Router()

authRouter.post('/register', registerValidation ,registerController)
authRouter.post('/login', loginValidation, loginController)
authRouter.get('/get-me', verifyUser, getMeController)

authRouter.get('/verify-email', verifyEmail)

export default authRouter;