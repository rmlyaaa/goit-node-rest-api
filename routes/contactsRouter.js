import express from "express";
import {
  addContact,
  getAll,
  getById,
  removeContact,
  updateContact,
  updateFavorite,
} from "../controllers/contactsControllers.js";
import { isValidId } from "../helpers/index.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAll);

contactsRouter.get("/:id", isValidId, getById);

contactsRouter.delete("/:id", isValidId, removeContact);

contactsRouter.post("/", addContact);

contactsRouter.put("/:id", isValidId, updateContact);

contactsRouter.patch("/:id/favorite", isValidId, updateFavorite);

export default contactsRouter;
