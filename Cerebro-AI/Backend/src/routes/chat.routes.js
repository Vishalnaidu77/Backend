import { Router } from 'express'
import { verifyUser } from '../middleware/auth.middleware.js';
import { sendMessage } from '../controllers/chat.controller.js';

const chatRouter = Router()

chatRouter.post("/message", verifyUser, sendMessage)

export default chatRouter;