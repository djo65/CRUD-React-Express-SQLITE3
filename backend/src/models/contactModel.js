import { db } from "../utils/db.js";

export const Contact = {
  create: (contact) => {
    const query = "INSERT INTO contacts (name, phone) VALUES (?, ?)";
    const params = [contact.name, contact.phone];

    return new Promise((resolve, reject) => {
      db.run(query, params, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(contact);
        }
      });
    });
  },
  readAll: () => {
    const query = "SELECT * FROM contacts";
    const params = [];

    return new Promise((resolve, reject) => {
      db.all(query, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  update: (id, contact) => {
    const query = "UPDATE contacts SET name = ?, phone = ? WHERE id = ?";
    const params = [contact.name, contact.phone, id];

    return new Promise((resolve, reject) => {
      db.run(query, params, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(contact);
        }
      });
    });
  },

  delete: (id) => {
    const query = "DELETE FROM  contacts WHERE id = ?";
    const params = [id];

    return new Promise((resolve, reject) => {
      db.run(query, params, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  },
};
