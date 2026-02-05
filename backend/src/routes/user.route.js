import {Router} from "express"
import {upload} from "../middlewares/multer.middleware.js"
import {registerUser, login, logOut, refreshAccessToken, changeCurrentPassword, updateUser, uploadAvatar, updateAvatar, deleteAccount, getUser, getAllUser, verifyEmailOtp, resendEmailOtp} from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

 
const router = Router()

// router.use(upload.none())

router.route("/register").post(registerUser);
router.route("/login").post(login);
router.route("/logout").get(verifyJWT, logOut);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/password-change").post(verifyJWT, changeCurrentPassword);
router.route("/update-user").patch(verifyJWT, upload.none(), updateUser);
router
  .route("/upload-avatar")
  .patch(
    verifyJWT,
    upload.fields([
        { name: "avatar", maxCount: 1 }
    ]),
    uploadAvatar
  );
  router.route("/update-avatar").patch(verifyJWT, upload.single("avatar"),updateAvatar);
  router.route("/account-delete").delete(verifyJWT, deleteAccount);
  router.route("/get-user/:userId").get(verifyJWT, getUser);
  router.route("/search-skill").get(verifyJWT, getAllUser);
  router.route("/email-verify").post(verifyEmailOtp);
  router.route("/resend-otp").post(resendEmailOtp);

export default router