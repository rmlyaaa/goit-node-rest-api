import express from "express";
import { addContact, getAll, getById, removeContact, updateContact } from "../controllers/contactsControllers.js"

const contactsRouter = express.Router();

contactsRouter.get("/", getAll);

contactsRouter.get("/:id", getById);

contactsRouter.delete("/:id", removeContact);

contactsRouter.post("/", addContact);

contactsRouter.put("/:id", updateContact);

export default contactsRouter;
