import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from 'url';
import { nanoid } from "nanoid";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contactsPath = path.join(__dirname, "/../db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data.toString());
}

async function getContactById(contactId) {
  const idStr = String(contactId);
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === idStr);
  console.log(contactId);
  return result || null;
}

async function removeContact(contactId) {
  const idStr = String(contactId);
  const contacts = await listContacts();
  const index = contacts.findIndex((contacts) => contacts.id === idStr);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

async function editContact(contactId, data) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { contactId, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
}

async function addContact(data) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

export default {
  listContacts,
  getContactById,
  editContact,
  removeContact,
  addContact,
};
