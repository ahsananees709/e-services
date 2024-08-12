import express from "express"
import {
  registerUser,
  verifyUser,
  getOTP,
  verifyOTP,
  login,
  updatePassword,
  resetPassword,
  profilePicture,
  completeProfile,
  switchRole,
  me,
  getFriend,
  logOut,
} from "../controllers/user.controllers.js"
import { validationMiddleware } from "../middlewares/validation_schema.js"
import {
  registerUserValidationSchema,
  verifyUserValidationSchema,
  getOTPValidationSchema,
  verifyOtpValidationSchema,
  loginValidationSchema,
  updatePasswordValidationSchema,
  resetPasswordValidationSchema,
  updateUserValidationSchema,
  completeProfileValidationSchema
} from "../validation_schemas/user.validation.schemas.js"
import { authentication, authorization, uploadProfilePictureMiddleware, checkUserAlreadyRegistered } from "../middlewares/auth_middlewares.js"
import { USER_ROLE } from "../utils/constants.js"

const router = express.Router()


router.get(
  "/get-otp/:email",
  validationMiddleware(getOTPValidationSchema, req => req.params),
  getOTP,
)

router.post(
  "/register",
  validationMiddleware(registerUserValidationSchema, req => req.body),
  checkUserAlreadyRegistered,
  registerUser,
)
router.post(
  "/verify-user",
  validationMiddleware(verifyUserValidationSchema, req => req.body),
  verifyUser,
)

router.post(
  "/verify-otp",
  validationMiddleware(verifyOtpValidationSchema, req => req.body),
  verifyOTP,
)
router.post(
  "/login",
  validationMiddleware(loginValidationSchema, req => req.body),
  login,
)
router.post(
  "/update-password",
  authentication,
  validationMiddleware(updatePasswordValidationSchema, req => req.body),
  updatePassword,
)
router.post(
  "/forget-password",
  validationMiddleware(resetPasswordValidationSchema, req => req.body),
  resetPassword,
)

router.patch(
  "/complete-profile",
  authentication,
  validationMiddleware(completeProfileValidationSchema, req => req.body),
  completeProfile,
)

router.patch("/profile-picture", authentication, uploadProfilePictureMiddleware, profilePicture)
router.patch("/switch-role",authentication,switchRole)
router
  .route("/me")
  .get(authentication, me)
  .patch(
    authentication,
    validationMiddleware(updateUserValidationSchema, req => req.body),
    me,
)
router.get(
  "/getfriend/:user_id",
  authentication,
  // validationMiddleware(getOTPValidationSchema, req => req.query),
  getFriend,
)
router.post("/logout", authentication, logOut)


export default router
