import {Router} from "express"
import {addSkill, deleteSkill} from "../controllers/offerskill.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()


router.route("/create-skill").post(verifyJWT, addSkill)

router.route("/delete-skill/:skillId").delete(verifyJWT, deleteSkill)


export default router