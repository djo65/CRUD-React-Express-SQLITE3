### 2. Configurer le Serveur Backend

1. **Configurer Express :**

   Cette étape consiste à configurer un serveur de base utilisant Express, un framework Node.js pour créer des applications web.

   - Dans `backend/app.js`, configurez un serveur Express simple.

   <details>
   <summary>Voir le code</summary>

   ```javascript
   import express from 'express';

   const app = express();
   const PORT = process.env.PORT || 5000;

   app.use(express.json());

   app.listen(PORT, () => {
       console.log(`Server is running on port ${PORT}`);
   });
   ```

   </details>


2. **Créer la base de données SQLite :**

   Cette étape vous guide pour créer une base de données SQLite et configurer la connexion à cette base.

   - Dans `backend/utils/`, créez le fichier `db.js` ainsi que la base de données `contact.sqlite`.
   - Configurez la connexion à SQLite dans `backend/utils/db.js`.

   <details>
   <summary>Voir le code</summary>

   ```javascript
   import sqlite3 from "sqlite3";

   sqlite3.verbose();

   export const db = new sqlite3.Database('./src/utils/contact.sqlite');

   export const initDB = () => {
       const sqlContent = `
           CREATE TABLE IF NOT EXISTS contacts (
               id INTEGER PRIMARY KEY, 
               name TEXT, 
               phone TEXT
           )
       `;

       db.exec(sqlContent, (err) => {
           if (err) {
               console.log(`Failed to load SQL query: ${err}`);
           } else {
               console.log(`SQL content loaded`);
           }
       });
   };
   ```

   </details>

   **Explication :**
   - `sqlite3.verbose()` permet d'activer les logs détaillés pour le débogage.
   - `db.exec()` exécute la commande SQL pour créer une table `contacts` si elle n'existe pas déjà.

   Ensuite, importez `initDB` dans `app.js` pour exécuter cette fonction à chaque lancement du serveur.

   <details>
   <summary>Voir le code</summary>

   ```javascript
   import express from "express";
   import { initDB } from "./utils/db.js";

   const app = express();
   const PORT = process.env.PORT || 5000;

   app.use(express.json());

   initDB();

   app.listen(PORT, () => {
       console.log(`Server is running on port ${PORT}`);
   });
   ```

   </details>

   **Explication :**
   - `initDB()` est appelé pour s'assurer que la table SQL est créée à chaque démarrage du serveur.
   - Vous pourrez ensuite visualiser la table en ouvrant le fichier `contact.sqlite`.

3. **Créer le modèle de données :**

   Le modèle de données gère les opérations CRUD (Create, Read, Update, Delete) sur les contacts.

   - Dans `backend/models/contactModel.js`, créez les fonctions pour gérer les contacts.

   <details>
   <summary>Voir le code</summary>

   ```javascript
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
           return new Promise((resolve, reject) => {
               db.all(query, [], (err, rows) => {
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
           const query = "DELETE FROM contacts WHERE id = ?";
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
       }
   };
   ```

   </details>


4. **Créer les contrôleurs :**

   Les contrôleurs gèrent la logique de traitement des requêtes HTTP et les réponses à envoyer au client.

   - Dans `backend/controllers/contactController.js`, créez les fonctions pour gérer les requêtes et les réponses.

   <details>
   <summary>Voir le code</summary>

   ```javascript
   import { Contact } from "../models/contactModel.js";

   export const createContact = async (req, res) => {
       try {
           const newContact = await Contact.create(req.body);
           res.status(201).json(newContact);
       } catch (error) {
           res.status(500).json({ error: 'Failed to create contact' });
       }
   };

   export const readAllContact = async (req, res) => {
       try {
           const contacts = await Contact.readAll();
           res.status(200).json(contacts);
       } catch (err) {
           res.status(500).json(`Failed to load contacts: ${err}`);
       }
   };

   export const updateContact = async (req, res) => {
       try {
           const id = req.params.id;
           const data = req.body;
           await Contact.update(id, data);
           res.status(202).send(`Contact with ID ${id} was successfully updated`);
       } catch (err) {
           res.status(500).json(`Failed to update contact: ${err.message}`);
       }
   };

   export const deleteContact = async (req, res) => {
       try {
           const id = req.params.id;
           await Contact.delete(id);
           res.status(202).send(`Contact with ID ${id} was successfully deleted`);
       } catch (err) {
           res.status(500).json(`Failed to delete contact: ${err}`);
       }
   };
   ```

   </details>


5. **Configurer les routes :**

   Les routes définissent les chemins d'accès aux différentes fonctionnalités de votre API.

   - Dans `backend/routes/contactRoutes.js`, configurez les routes pour les opérations CRUD sur les contacts.

   <details>
   <summary>Voir le code</summary>

   ```javascript
   import express from "express";
   import * as contactControllers from "../controllers/contactController.js";

   const router = express.Router();

   router.post("/", contactControllers.createContact);

   router.get("/", contactControllers.readAllContact);

   router.put("/:id", contactControllers.updateContact);

   router.delete("/:id", contactControllers.deleteContact);

   export default router;
   ```

   </details>

   **Explication :**
   - Chaque route est associée à un contrôleur qui gère la logique de traitement des données pour cette route spécifique.

6. **Connecter les routes au serveur :**

   Enfin, il est nécessaire de lier les routes définies précédemment au serveur Express.

   - Dans `backend/app.js`, importez et utilisez les routes que vous avez créées.

   <details>
   <summary>Voir le code</summary>

   ```javascript
   import express from "express";
   import { initDB } from "./utils/db.js";
   import contactRoutes from "./routes/contactRoutes.js";

   const app = express();
   const PORT = process.env.PORT || 5000;

   app.use(express.json());

   app.use("/api/contacts", contactRoutes);

   initDB();

   app.listen(PORT, () => {
       console.log(`Server is running on port ${PORT}`);
   });
   ```

   </details>

Bien sûr ! Voici la section améliorée pour tester les routes HTTP dans votre README :

---

### 3. Tester les Routes HTTP

Pour tester les routes de votre API, vous pouvez utiliser un fichier `contact.http` contenant des requêtes HTTP pour chaque opération CRUD. Assurez-vous que le serveur est en cours d'exécution avant de lancer ces tests.

1. **Ajouter un contact :**

   <details>
   <summary>Voir le code</summary>

   ```http
   POST http://localhost:5000/api/contacts/
   Content-Type: application/json

   {
       "name": "Caribou",
       "phone": "06 01 02 03 04"
   }
   ```

   </details>

   **Explication :**
   - **Méthode** : `POST`
   - **URL** : `/api/contacts/`
   - **Headers** : `Content-Type: application/json`
   - **Body** : JSON contenant les informations du contact à ajouter.
   - **Attendu** : Réponse avec le contact créé et un statut `201 Created`.

2. **Lire tous les contacts :**

   <details>
   <summary>Voir le code</summary>

   ```http
   GET http://localhost:5000/api/contacts/
   ```

   </details>

   **Explication :**
   - **Méthode** : `GET`
   - **URL** : `/api/contacts/`
   - **Attendu** : Liste des contacts avec un statut `200 OK`.

3. **Supprimer un contact :**

   <details>
   <summary>Voir le code</summary>

   ```http
   DELETE http://localhost:5000/api/contacts/5
   ```

   </details>

   **Explication :**
   - **Méthode** : `DELETE`
   - **URL** : `/api/contacts/5`
   - **Attendu** : Confirmation de la suppression avec un statut `202 Accepted`.

4. **Mettre à jour un contact :**

   <details>
   <summary>Voir le code</summary>

   ```http
   PUT http://localhost:5000/api/contacts/4
   Content-Type: application/json

   {
       "name": "Caribou2",
       "phone": "06 01 02 03 04"
   }
   ```

   </details>

   **Explication :**
   - **Méthode** : `PUT`
   - **URL** : `/api/contacts/4`
   - **Headers** : `Content-Type: application/json`
   - **Body** : JSON avec les nouvelles informations du contact.
   - **Attendu** : Confirmation de la mise à jour avec un statut `202 Accepted`.

---

Ces tests permettent de vérifier que chaque fonctionnalité de votre API fonctionne correctement. Assurez-vous de lancer le serveur avant de tester les routes.


## Structure du Projet

```bash
└── backend/
    ├── src/
    │   ├── controllers/
    │   │   └── contactController.js  # Logique métier
    │   ├── models/
    │   │   └── contactModel.js       # Modèle de données pour les contacts
    │   ├── routes/
    │   │   └── contactRoutes.js      # Définitions des routes Express
    │   ├── utils/
    │   │   ├── db.js                 # Configuration et initialisation de la base de données
    │   │   └── contact.sqlite        # Fichier de la base de données SQLite
    │   └── app.js                    # Point d'entrée de l'application
    └── package.json
```

### Fichiers Importants

- **`dbConfig.js`** : Contient la configuration de la base de données SQLite et exécute les requêtes SQL pour créer les tables.
- **`contactModel.js`** : Définit les fonctions pour interagir avec la base de données (par exemple, récupérer, ajouter, mettre à jour et supprimer des contacts).
- **`contactController.js`** : Gère les requêtes HTTP en appelant les fonctions du modèle.
- **`contactRoutes.js`** : Définit les routes API pour gérer les contacts.
- **`contact.sqlite`** : Ta base de données ou toutes les requêtes SQL seront éxécutées
- **`app.js`** : Point d'entrée principal pour démarrer le serveur Express.


