import express from "express";
import {
  register,
  login,
  getCurrent,
  logout,
} from "../controllers/authControllers.js";
import { validateBody, authMiddlewares } from "../helpers/index.js";
import { registerSchema, loginSchema } from "../schemas/userSchema.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(registerSchema), register);
authRouter.post("/login", validateBody(loginSchema), login);
authRouter.get("/current", authMiddlewares, getCurrent);
authRouter.post("/logout", authMiddlewares, logout);

export default authRouter;
