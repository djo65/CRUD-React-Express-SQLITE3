import sqlite3 from "sqlite3";

sqlite3.verbose();

export const db = new sqlite3.Database("./src/utils/contact.sqlite");

export const initDB = () => {
  const sqlContent = `CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY, name TEXT, phone TEXT)`;

  db.exec(sqlContent, (err) => {
    if (err) {
      console.log(`faiil to load sqlquery : ${err}`);
    } else {
      console.log(`SQL content loader`);
    }
  });
};
