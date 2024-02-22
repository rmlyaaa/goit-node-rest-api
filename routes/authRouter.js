import express from "express";
import {
  register,
  login,
  getCurrent,
  logout,
  updateAvatar,
} from "../controllers/authControllers.js";
import { validateBody, authMiddlewares, upload } from "../helpers/index.js";
import { registerSchema, loginSchema } from "../schemas/userSchema.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(registerSchema), register);
authRouter.post("/login", validateBody(loginSchema), login);
authRouter.get("/current", authMiddlewares, getCurrent);
authRouter.post("/logout", authMiddlewares, logout);
authRouter.patch(
  "/avatars",
  authMiddlewares,
  upload.single("avatar"),
  updateAvatar
);

export default authRouter;
