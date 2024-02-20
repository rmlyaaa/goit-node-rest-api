import { HttpError, ctrlWrapper } from "../helpers/index.js";
import { addSchema, updateFavoriteSchema } from "../schemas/contactSchemas.js";
import { Contact } from "../models/contact.js";

const _getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, " ", { skip, limit }).populate(
    "owner",
    "name email"
  );
  return res.json(result);
};

const _getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const _addContact = async (req, res) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const _updateContact = async (req, res) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(400, "Not found");
  }
  res.json(result);
};

const _updateFavorite = async (req, res) => {
  const { error } = updateFavoriteSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(400, "Not found");
  }
  res.json(result);
};

const _removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "Delete success" });
};

export const getAll = ctrlWrapper(_getAll);
export const getById = ctrlWrapper(_getById);
export const addContact = ctrlWrapper(_addContact);
export const updateContact = ctrlWrapper(_updateContact);
export const updateFavorite = ctrlWrapper(_updateFavorite);
export const removeContact = ctrlWrapper(_removeContact);
