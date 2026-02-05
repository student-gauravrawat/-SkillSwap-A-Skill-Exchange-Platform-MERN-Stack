import {Router} from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {addSkill, deleteSkill} from "../controllers/learnskill.controller.js"
const router = Router()

router.route("/create-skill").post(verifyJWT, addSkill)

router.route("/delete-skill/:skillId").delete(verifyJWT, deleteSkill)

export default router