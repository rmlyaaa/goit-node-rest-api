import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import fs from "fs/promises";
import Jimp from "jimp";
import { resolve } from "path";

import User from "../models/user.js";
import { HttpError, ctrlWrapper } from "../helpers/index.js";

const { SECRET_KEY } = process.env;

const _register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const _login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const _getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

const _logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json();
};

const _updateAvatar = async (req, res) => {
  const { filename } = req.file;
  const { user } = req;
  const tmpPath = resolve("tmp", filename);
  const publickPath = resolve("public/avatars", filename);

  if (user) {
    await Jimp.read(tmpPath).then((avatar) => {
      return avatar.resize(250, 250).quality(60).write(publickPath);
    });
    fs.unlink(tmpPath);
    const updateUser = await User.findByIdAndUpdate(
      user._id,
      {
        avatarURL: "avatars/" + filename,
      },
      { new: true }
    );
    res.status(200).json({ avatarUrl: updateUser.avatarURL });
  } else {
    throw HttpError(401, "Not authorized");
  }
};

export const register = ctrlWrapper(_register);
export const login = ctrlWrapper(_login);
export const getCurrent = ctrlWrapper(_getCurrent);
export const logout = ctrlWrapper(_logout);
export const updateAvatar = ctrlWrapper(_updateAvatar);
