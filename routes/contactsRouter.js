import express from "express";
import {
  addContact,
  getAll,
  getById,
  removeContact,
  updateContact,
  updateFavorite,
} from "../controllers/contactsControllers.js";
import { isValidId, authMiddlewares } from "../helpers/index.js";

const contactsRouter = express.Router();

contactsRouter.get("/", authMiddlewares, getAll);

contactsRouter.get("/:id", authMiddlewares, isValidId, getById);

contactsRouter.delete("/:id", authMiddlewares, isValidId, removeContact);

contactsRouter.post("/", authMiddlewares, addContact);

contactsRouter.put("/:id", authMiddlewares, isValidId, updateContact);

contactsRouter.patch(
  "/:id/favorite",
  authMiddlewares,
  isValidId,
  updateFavorite
);

export default contactsRouter;
