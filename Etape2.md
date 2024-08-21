### 2. Configurer le Serveur Backend

1. **Configurer Express** :
   - Dans `backend/app.js`, configurez un serveur Express de base.

   ```javascript
   import express from 'express';

   const app = express();
   const PORT = process.env.PORT || 5000;

   app.use(express.json());

   app.listen(PORT, () => {
       console.log(`Server is running on port ${PORT}`);
   });
   ```

2. **Créer la base de données SQLite** :
    - Dans `backend/utils/`, creer le fichier `db.js` et `contact.sqlite`

    - Dans `backend/utils/db.js`, configurez la connexion à SQLite, elle doit lire le fichier `contact.sqlite`.

   ```javascript
   import sqlite3 from 'sqlite3';
   import { open } from 'sqlite';

   export async function initDb() {
       const db = await open({
           filename: './contact.sqlite',
           driver: sqlite3.Database
       });

       await db.exec('CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY, name TEXT, phone TEXT)');
       return db;
   }
   ```

3. **Créer le modèle de données** :
   - Dans `backend/models/contactModel.js`, créez les fonctions pour gérer les contacts.

   ```javascript
   import { initDb } from '../database/db.js';

   export async function getAllContacts() {
       const db = await initDb();
       return db.all('SELECT * FROM contacts');
   }

   export async function createContact(contact) {
       const db = await initDb();
       const { name, phone } = contact;
       await db.run('INSERT INTO contacts (name, phone) VALUES (?, ?)', [name, phone]);
       return { name, phone };
   }

   export async function deleteContact(id) {
       const db = await initDb();
       await db.run('DELETE FROM contacts WHERE id = ?', [id]);
   }
   ```

4. **Créer les contrôleurs** :
   - Dans `backend/controllers/contactController.js`, gérez les requêtes et les réponses.

   ```javascript
   import { getAllContacts, createContact, deleteContact } from '../models/contactModel.js';

   export async function getAllContactsHandler(req, res) {
       const contacts = await getAllContacts();
       res.json(contacts);
   }

   export async function createContactHandler(req, res) {
       const newContact = await createContact(req.body);
       res.status(201).json(newContact);
   }

   export async function deleteContactHandler(req, res) {
       await deleteContact(req.params.id);
       res.status(204).end();
   }
   ```

5. **Configurer les routes** :
   - Dans `backend/routes/contactRoutes.js`, définissez les routes pour les contacts.

   ```javascript
   import express from 'express';
   import { getAllContactsHandler, createContactHandler, deleteContactHandler } from '../controllers/contactController.js';

   const router = express.Router();

   router.get('/', getAllContactsHandler);
   router.post('/', createContactHandler);
   router.delete('/:id', deleteContactHandler);

   export default router;
   ```

6. **Connecter les routes au serveur** :
   - Dans `backend/app.js`, ajoutez les routes à votre application Express.

   ```javascript
   import contactRoutes from './routes/contactRoutes.js';

   app.use('/api/contacts', contactRoutes);
   ```
