import express from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {sendMessage, getMessage} from "../controllers/message.controller.js"
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router()
router.use(upload.none())

router.route("/send/:id").post(verifyJWT, sendMessage)
router.route("/get-conversation/:id").get(verifyJWT, getMessage)

export default router;