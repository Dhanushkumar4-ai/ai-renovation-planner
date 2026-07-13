# Renov-AI — AI-Powered Renovation Planner

<div align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Node.js-18-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-8-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Flask-ML_Service-000000?style=for-the-badge&logo=flask&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
</div>

## 🏠 Overview

**Renov-AI** is a full-stack AI-powered web application that connects homeowners with skilled renovation professionals through an intelligent recommendation system.

### 🤖 AI/ML Pipeline

```
User Requirement (Natural Language)
        ↓
Text Cleaning + Stop Word Removal
        ↓
TF-IDF Vectorization (sklearn)
        ↓
Cosine Similarity vs Worker Skill Profiles
        ↓
Feature Engineering (rating, experience, projects, availability)
        ↓
Random Forest Ranking (n_estimators=50)
        ↓
Final Score = 0.6×RF + 0.3×Cosine + 0.1×NormalizedRating
        ↓
Top 20 Ranked Workers
```

## 🚀 Features

- **AI Worker Matching** — Natural language requirement → ranked professional recommendations
- **AI Design Suggestions** — Color palette, flooring, lighting, furniture ideas per room
- **JWT Authentication** — Secure register/login with role-based access (homeowner/worker/admin)
- **50+ Workers** — Demo dataset across 9 categories in 10 Indian cities
- **Worker Profiles** — Portfolio, skills, ratings, experience, hire history
- **Hire System** — Request, accept/decline, mark complete lifecycle
- **Review System** — Rate workers, auto-updates average rating
- **Admin Dashboard** — Manage users, workers, categories, monitor hires

## 📁 Project Structure

```
ai-renovation-planner-updated/
├── frontend/          ← React 18 + Vite + Tailwind CSS
│   └── src/
│       ├── context/   ← AuthContext (JWT)
│       ├── pages/     ← Landing, Login, Register, Home, Workers,
│       │                 WorkerDetails, RecommendPage, HireHistory,
│       │                 WorkerDashboard, AdminDashboard, Profile
│       └── components/ ← NavBar, WorkerCard
├── server/            ← Node.js + Express + MongoDB
│   ├── models/        ← User, Worker, Review, Hire
│   ├── routes/        ← auth, workers, hire, reviews, recommend, admin, design
│   ├── middleware/    ← JWT auth
│   ├── index.js       ← App entry
│   └── seed.js        ← 51 users + 50 workers
└── ml-service/        ← Python Flask ML Microservice
    ├── app.py         ← Flask routes
    └── recommend.py   ← TF-IDF + Cosine + Random Forest pipeline
```

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Tailwind CSS, Axios |
| Backend | Node.js, Express.js, JWT, bcrypt |
| Database | MongoDB 8, Mongoose ODM |
| ML Service | Python 3.13, Flask, scikit-learn, pandas, numpy |
| Auth | JWT (7-day expiry), bcryptjs password hashing |

## ⚡ Quick Start

### Prerequisites
- Node.js 18+, MongoDB 8+, Python 3.8+

### 1. Clone & Install

```bash
git clone https://github.com/Dhanushkumar4-ai/ai-renovation-planner.git
cd ai-renovation-planner-updated

# Backend
cd server && npm install

# Frontend
cd ../frontend && npm install

# ML Service
cd ../ml-service && pip3 install -r requirements.txt
```

### 2. Configure

```bash
# server/.env
MONGO_URI=mongodb://localhost:27017/renovai
JWT_SECRET=your_secret_key
ML_SERVICE_URL=http://localhost:5001
OPENAI_API_KEY=sk-...  # Optional for AI design ideas
PORT=3001
```

### 3. Seed Database

```bash
cd server && node seed.js
# Creates 51 users + 50 workers
```

### 4. Run Services

```bash
# Terminal 1 - Backend
cd server && node index.js

# Terminal 2 - ML Service
cd ml-service && python3 app.py

# Terminal 3 - Frontend
cd frontend && npm run dev
```

Open: **http://localhost:5173**

## 🔑 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@renovai.com | password123 |
| Homeowner | arjun.sharma@gmail.com | password123 |
| Worker | (register as worker) | — |

## 📡 API Endpoints

```
POST   /api/auth/register       — Register
POST   /api/auth/login          — Login (returns JWT)

GET    /api/workers             — List workers (filter, sort, paginate)
GET    /api/workers/:id         — Worker profile
PUT    /api/workers/:id         — Update worker (auth)

POST   /api/recommend           — AI recommendations (auth)
POST   /api/design              — Design idea generator

POST   /api/hire                — Hire a worker (auth)
GET    /api/hire/history        — My hire history (auth)
GET    /api/hire/worker-requests — Worker's incoming requests (auth)
PUT    /api/hire/:id/status     — Update hire status (auth)

POST   /api/reviews             — Post review (auth)
GET    /api/reviews/:workerId   — Worker reviews

GET    /api/admin/stats         — Platform stats (admin)
GET    /api/admin/users         — All users (admin)
DELETE /api/admin/users/:id     — Delete user (admin)
GET    /api/admin/workers       — All workers (admin)
PUT    /api/admin/workers/:id/approve — Approve worker (admin)
```

## 🗄️ Worker Categories

Carpenter | Painter | Electrician | Plumber | Mason | Interior Designer | Civil Contractor | Flooring | Tiling

## 🌆 Cities Covered

Bengaluru | Mumbai | Delhi | Chennai | Hyderabad | Pune | Kolkata | Ahmedabad | Jaipur | Kochi

## 📄 License

MIT © 2024 Renov-AI
