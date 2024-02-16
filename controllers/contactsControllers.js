import { HttpError, ctrlWrapper } from "../helpers/index.js";

import contacts from "../services/contactsServices.js";


const _getAll = async (req, res) => {
  const result = await contacts.listContacts();
  return res.json(result);
};

const _getById = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.getContactById(id);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const _addContact = async (req, res) => {
  console.log("body", req.body);
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const _updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.editContact(id, req.body);
  if (!result) {
    throw HttpError(400, "Not found");
  }
  res.json(result);
};

const _removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.removeContact(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "Delete success" });
};

export const getAll = ctrlWrapper(_getAll);
export const getById = ctrlWrapper(_getById);
export const addContact = ctrlWrapper(_addContact);
export const updateContact = ctrlWrapper(_updateContact);
export const removeContact = ctrlWrapper(_removeContact);
