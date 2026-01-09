# 💰 Budget Manager – MERN Application

Budget Manager est une application web **full-stack** de gestion de budget personnel développée avec la stack **MERN** (**MongoDB, Express.js, React, Node.js**).
Elle permet aux utilisateurs de gérer leurs budgets, suivre leurs dépenses, organiser leurs transactions par catégories et visualiser des statistiques financières en temps réel.

---

## 📋 Table des matières

* [Vue d’ensemble](#vue-densemble)
* [Fonctionnalités](#fonctionnalités)
* [Architecture de l’application](#architecture-de-lapplication)
* [Structure du projet](#structure-du-projet)
* [Schéma d’architecture](#schéma-darchitecture)
* [Installation](#installation)
* [Commandes utiles](#commandes-utiles)
* [Tests de l’application](#tests-de-lapplication)
* [Technologies utilisées](#technologies-utilisées)

---

## 🧾 Vue d’ensemble

Budget Manager est conçu pour aider les utilisateurs à :

* Créer et gérer plusieurs budgets
* Suivre précisément leurs dépenses
* Classer les transactions par catégories
* Visualiser leur situation financière via un dashboard interactif
* Gérer leur profil utilisateur en toute sécurité

L’application adopte une architecture moderne, sécurisée et scalable.

---

## ✨ Fonctionnalités

* ✅ Authentification sécurisée (**JWT + bcrypt**)
* 💰 Gestion complète des budgets (**CRUD**)
* 📊 Suivi des dépenses avec catégorisation
* 🏷️ Gestion des catégories personnalisées
* 👤 Profil utilisateur éditable
* 📈 Dashboard avec statistiques en temps réel
* 🎨 Interface moderne avec **dark mode violet/bleu**
* 📱 Design **responsive** (mobile, tablette, desktop)

---

## 🏗️ Architecture de l’application

L’application est divisée en trois couches principales :

* **Frontend** : React (Vite)
* **Backend** : Node.js + Express
* **Base de données** : MongoDB (via Mongoose)

---

## 📁 Structure du projet

```
projet-mern-budget/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── budgetController.js
│   │   ├── categoryController.js
│   │   ├── expenseController.js
│   │   └── profileController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Profile.js
│   │   ├── Budget.js
│   │   ├── Expense.js
│   │   └── Category.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── budgetRoutes.js
│   │   ├── categoryRoutes.js
│   │   ├── expenseRoutes.js
│   │   └── profileRoutes.js
│   ├── validators/
│   │   ├── authValidator.js
│   │   ├── budgetValidator.js
│   │   ├── categoryValidator.js
│   │   ├── expenseValidator.js
│   │   └── profileValidator.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── layout/
    │   │   │   ├── Layout.jsx
    │   │   │   ├── Sidebar.jsx
    │   │   │   └── Header.jsx
    │   │   └── ui/
    │   │       └── Card.jsx
    │   ├── pages/
    │   │   ├── Auth/
    │   │   ├── Dashboard/
    │   │   ├── Budget/
    │   │   ├── Expense/
    │   │   ├── Category/
    │   │   └── Profile/
    │   ├── services/
    │   ├── context/
    │   ├── styles/
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── .env
```

---

## 🔗 Schéma d’architecture et relations

```
FRONTEND (React)
    ↓ Axios / HTTP
BACKEND (Node.js + Express)
    ↓ Mongoose
DATABASE (MongoDB)
```
```
1. Relation 1-to-1 : User ↔ Profile

Un utilisateur a un seul profil, et un profil appartient à un seul utilisateur.
2. Relation 1-to-Many : User → Budget

Un utilisateur peut créer plusieurs budgets, mais chaque budget appartient à un seul utilisateur.
3. Relation 1-to-Many : User → Expense

Un utilisateur peut avoir plusieurs dépenses, mais chaque dépense appartient à un seul utilisateur.
4. Relation 1-to-Many : Budget → Expense

Un budget peut contenir plusieurs dépenses, mais chaque dépense appartient à un seul budget.
5. Relation Many-to-Many : User ↔ Category

Un utilisateur peut avoir plusieurs catégories, et une catégorie peut appartenir à plusieurs utilisateurs.
6. Relation Many-to-One : Expense → Category

Plusieurs dépenses peuvent appartenir à une même catégorie, mais chaque dépense a une seule catégorie.



---

## ⚙️ Installation

### 📌 Prérequis

* Node.js **v14+**
* MongoDB **v4.4+**
* npm ou yarn

---

### 1️⃣ Cloner le projet

```bash
git clone <repository-url>
cd projet-mern-budget
```

---

### 2️⃣ Configuration du Backend

```bash
cd backend
npm install
touch .env
```

**Contenu du fichier `.env` :**

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/budgetDB
JWT_SECRET=your_secret_key
```

Générer une clé JWT :

```bash
openssl rand -base64 32
```

Démarrer MongoDB :

```bash
sudo systemctl start mongodb
# ou
mongod
```

Lancer le backend :

```bash
npm run dev
# ou
node server.js
```

➡️ Backend disponible sur **[http://localhost:5000](http://localhost:5000)**

---

### 3️⃣ Configuration du Frontend

```bash
cd frontend
npm install
touch .env
```

**Contenu du fichier `.env` :**

```env
VITE_API_URL=http://localhost:5000/api
```

Lancer le frontend :

```bash
npm run dev
```

➡️ Frontend disponible sur **[http://localhost:5173](http://localhost:5173)**

---

## 🧪 Commandes utiles

### Backend

```bash
npm run dev
node server.js
npm test
```

### Frontend

```bash
npm run dev
npm run build
npm run preview
```

### MongoDB

```bash
mongosh
use budgetDB
db.users.find()
db.budgets.deleteMany({})
```

---

## ✅ Tests de l’application

1. Créer un compte → `/register`
2. Se connecter → `/login`
3. Créer un budget → `/budgets`
4. Ajouter des catégories → `/categories`
5. Ajouter des dépenses → `/expenses`
6. Consulter le dashboard → `/dashboard`

---

## 🛠️ Technologies utilisées

### Frontend

* React (Vite)
* Axios
* Context API
* CSS / Dark Mode

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* express-validator

---

## 📌 Auteur

**Sarah Ghabri**
🎓 Software Engineering Student
📍 Tunisia
📧 [sarahghabri175@gmail.com](mailto:sarahghabri175@gmail.com)
🌐 [Portfolio](https://personalwebportfolio.onrender.com)

---

⭐ *N’hésitez pas à mettre une étoile au projet si vous l’aimez !*
