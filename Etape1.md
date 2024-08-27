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

Creer de suite un `.gitignore` pour les node_modules pour ne pas les envoyer sur Git Hub

3. **Configurer le Mode Module** :

Assurez-vous que le projet utilise le mode ECMAScript Modules (ESM). Pour cela, ajoutez `"type": "module"` dans le fichier `package.json` :

```json
{
  "name": "backend",
  "version": "1.0.0",
  "type": "module",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon src/app.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.19.2",
    "sqlite3": "^5.1.7"
  },
  "devDependencies": {
    "nodemon": "^3.1.4"
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
    ├── node_modules/
    ├── src/
    │   ├── controllers/ 
    │   ├── models/       
    │   ├── routes/   
    │   ├── utils/         
    │   ├── tests/        
    │   └── app.js    
    ├── .gitignore               
    ├── package.json
    └── package-lock.json
```

