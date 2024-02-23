import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "rasmalyaaa@meta.ua",
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: "rasmalyaaa@meta.ua" };
  await transport
    .sendMail(email)
    .then(() => console.log("email sent successfully"))
    .catch((error) => console.log(error.message));
  return true;
};

export default sendEmail;
