# Projet de Gestion des Contacts

## Objectif

Dans ce projet, vous allez créer une application simple de gestion des contacts en utilisant **Express** pour le backend, **SQLite** comme base de données, et **React** pour le frontend. Vous allez apprendre à construire une application complète de A à Z, en suivant les principes du modèle MVC et en utilisant des concepts modernes de développement web.

## Étapes du Projet

Ce projet est divisé en plusieurs étapes que vous devez suivre dans l'ordre. Chaque étape introduit de nouveaux concepts et techniques.

tu auras besoin des extensions vsCode suivante `SQLite Viewer` et `REST Client`

### 1. Initialiser le Projet

#### Backend

1. **Initialiser le backend** :
   - Dans le dossier `racine de ton projet`, Creer le répertoire backend et initialise un nouveau projet Node.js à l'interieur.

   ```bash
    mkdir backend
    cd backend
    npm init -y
   ```

2. **Installer les dépendances**

Installe toutes les dépendances nécessaires pour le backend de ce projet :

```bash
    npm install express sqlite3
    npm install -D nodemon
```

3. **Configurer le Mode Module** :

Assurez-vous que le projet utilise le mode ECMAScript Modules (ESM). Pour cela, ajoutez `"type": "module"` dans le fichier `package.json` :

```json
{
  "name": "CRUD-REACT-EXPRESS-SQLITE3",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node src/app.js",
    "dev": "nodemon src/app.js"
  },
  "dependencies": {
    "express": "^4.18.1",
    "sqlite3": "^5.0.2"
  }
}
```

4. **Creer la structure de ton projet** :

Utilise la commande suivante pour créer la structure de base de ton backend :


```bash
    mkdir -p src/{controllers,models,routes,utils,tests} && touch src/app.js
```

Ton projet devrait ressembler a ceci pour le moment ! 

```bash
└── backend/
    ├── src/
    │   ├── controllers/ 
    │   ├── models/       
    │   ├── routes/   
    │   ├── utils/         
    │   ├── tests/        
    │   └── app.js                   
    └── package.json
```







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




