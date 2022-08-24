const fs = require("fs/promises");
const path = require("path");
const nanoID = require("nano-id");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const dataJSON = await fs.readFile(contactsPath, "utf-8");
    const data = JSON.parse(dataJSON);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contactData = JSON.parse(data).find(({ id }) => id === contactId);
    if (contactData) {
      console.log(contactData);
    } else {
      console.log("There is no contact with such id");
      return;
    }
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contactData = JSON.parse(data).find(({ id }) => id === contactId);
    if (contactData) {
      console.log(`contact ${contactData.name} was deleted`);
    } else {
      console.log("There is no contact with such id");
      return;
    }
    const newContactList = JSON.parse(data).filter(
      ({ id }) => id !== contactId
    );
    await fs.writeFile(
      contactsPath,
      JSON.stringify(newContactList, null, 2),
      "utf-8"
    );
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  const dataJSON = await fs.readFile(contactsPath, "utf-8");
  const data = JSON.parse(dataJSON);
  const newContact = { id: nanoID(), name, email, phone };
  const newContactList = [...data, newContact];
  console.log(`${newContact.name} was added`);

  try {
    const data = await fs.writeFile(
      contactsPath,
      JSON.stringify(newContactList, null, 2),
      "utf-8"
    );
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
