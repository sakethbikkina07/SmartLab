# SmartLab — Intelligent Laboratory Automation & Assessment Platform

> **From Record-Oriented Labs to Implementation-Oriented Learning.**

SmartLab is an AI-powered practical laboratory automation and continuous assessment platform featuring a separated **Node.js Express REST API backend** with **MySQL database persistence** and a modern **React 18 + Vite + Tailwind CSS v4 (glassmorphism UI) + Monaco Editor frontend**.

---

## 🚀 How to Run the Project

### Prerequisites
- **Node.js**: v18+ or v20+ recommended (`node -v`)
- **npm**: v9+ (`npm -v`)
- **MySQL**: (Optional for local persistent database; backend includes automatic resilient fallback)

---

### Option A: Run Both Frontend & Backend Together (Recommended)

From the project root directory:

```bash
# 1. Install all dependencies (root, backend, frontend)
npm run install:all

# 2. Run both backend and frontend concurrently with a single command
npm run dev
```

- **Frontend Application**: [http://localhost:5173](http://localhost:5173)
- **Backend REST API**: [http://localhost:5000](http://localhost:5000)
- **API Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

Vite is preconfigured with an automatic reverse proxy forwarding all `/api/*` calls from port 5173 to port 5000.

---

### Option B: Run Backend & Frontend in Separate Terminals

#### Terminal 1 — Backend (Node.js & Express)
```bash
cd backend
npm install
npm run dev      # or npm start
```
*Backend server runs on port 5000.*

#### Terminal 2 — Frontend (React & Vite)
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs on port 5173.*

---

## 🐬 MySQL Database Configuration

The backend supports full MySQL database persistence for storing all records.

### 1. Database Credentials Configuration
Copy `backend/.env.example` to `backend/.env` and configure your credentials:
```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=smartlab
```

### 2. Database Initialization & Seeding
To initialize the database schema and seed data:
```bash
# From project root:
npm run db:init

# Or from backend directory:
cd backend && npm run db:init
```

### 3. Dual-Mode Resilient Architecture
- **Connected**: The backend interacts directly with the MySQL database via `mysql2/promise` connection pooling.
- **Offline / Development**: If a MySQL server is not detected, the backend logs a friendly notice and gracefully transitions into the high-performance in-memory/JSON store with zero downtime or crashes.

---

## 🔑 Demo Login Accounts

Exactly **1 demo user for each of the 5 roles** is registered (password: `demo1234` or `password123`):

| Role | Name | Email | Permissions |
|------|------|-------|-------------|
| **Super Admin** | Aarav Mehta | `super@smartlab.edu` | Platform & Multi-College Governance, College Registration |
| **College Admin** | Dr. Kavya Rao | `admin@smartlab.edu` | Departments, Faculty, Students, Resources, System Status |
| **HOD** | Prof. Rohit Sharma | `hod@smartlab.edu` | Department Analytics, Faculty Workload, Subject Completion |
| **Faculty** | Dr. Ananya Iyer | `faculty@smartlab.edu` | Manuals, Daily Tasks, Live Monitoring, Similarity, Viva, Marks |
| **Student** | Sneha Reddy | `student@smartlab.edu` | Monaco Code Editor, MCQ Tests, Dry Run, Skill Passport, Notes |

---

## 📊 Normalized 5-Record Dataset

All entities across the database and frontend are initialized with exactly **5 realistic records**:
- **5 Colleges**: Vignan Institute of Tech, Sri Chaitanya Engg, NovaTech College, Sagar Institute, Apex Academy.
- **5 Departments**: Computer Science & Engineering, Information Technology, AI & Data Science, Electronics, Cyber Security.
- **5 Faculty Members**: Dr. Ananya Iyer, Prof. Karan Bose, Dr. Lata Menon, Prof. Vikram Rao, Dr. Sunita Deshmukh.
- **5 Students**: Sneha Reddy, Rahul Verma, Priya Das, Imran Khan, Ankit Sharma.
- **5 Subjects / Labs**: Python Programming Lab, Java Lab, C Data Structures, Database Systems, Web Technology.
- **5 Experiments**: Fibonacci Series, Bubble Sort, Stack using Arrays, Inheritance Demo, Binary Search Tree.
- **5 Lab Manuals**: Python, Java, C, DBMS, Web Technologies manuals.
- **5 Daily Tasks**: Palindrome checker, Matrix multiplication, Linked list, Binary search, SQL schema.
- **5 Assessments**: Practical 1, Internal 2, Viva round 1, Continuous test 1, Semester end practical.
- **5 Submissions**: Student submissions with similarity flags, scores, and evaluation states.
- **5 Monitoring Feeds**: Real-time student coding activity tracking.
- **5 MCQ Question Pools**: Loops, Pointers, OOP, SQL, Data Structures.
- **5 Viva Records**: Student viva evaluations and conceptual feedback.
- **5 Attendance Records**: Session attendance logs with QR verification states.
- **5 Hardware Resources**: Workstations, network switches, printers, and lab hardware.
- **5 Internal Marks Records**: Continuous assessment calculations.
- **5 Digital Notes**: Reference cheat sheets and diagrams.
- **5 Execution History Items**: Multi-language code runs.
- **5 Lab Records**: Formal experiment records.
- **5 Achievement Badges**: Gamified milestones.
- **5 Verified Skills**: Python, DSA, C/C++, Java, SQL proficiencies.
- **5 System Activities**: Audit log of administrative actions.
- **5 Users**: The 1 demo user per role.

---

## 📁 Separated Folder Structure

```
smartlab/
├── backend/                       # Node.js & Express REST API Server
│   ├── package.json               # Backend dependencies (express, cors, dotenv, mysql2)
│   ├── .env                       # Database credentials
│   ├── .env.example
│   ├── db/
│   │   └── schema.sql             # Complete MySQL DDL & 5-record seed script
│   └── src/
│       ├── app.js                 # Express app initialization & route registration
│       ├── server.js              # Server entry point (port 5000)
│       ├── config/
│       │   ├── db.js              # MySQL connection pool & resilient fallback
│       │   ├── initDb.js          # Migration & database seed runner
│       │   └── defaultData.js     # 5-record seed data for all 23 entities
│       ├── controllers/           # Modular REST controllers
│       ├── middleware/            # Global error handling
│       ├── models/                # Memory store with MySQL integration
│       └── routes/                # Express API route handlers
│
├── frontend/                      # React 18 + Vite + Tailwind v4 Client
│   ├── package.json
│   ├── vite.config.js             # Vite config with reverse proxy to :5000
│   └── src/
│       ├── App.jsx                # Router, role guards & page routing
│       ├── config.js              # Role navigation menus & permissions
│       ├── data.js                # 5-record dataset definitions
│       ├── components/            # UI components (GlassCard, Modal, ChartBox...)
│       ├── constants/             # Clean stats & navigation definitions
│       ├── context/               # AuthProvider with JWT sync
│       ├── pages/                 # Modular domain pages for all 5 roles
│       └── services/              # API client and synchronized state
│
├── tests/                         # End-to-end verification tests
│   ├── e2e.py                     # 10 core user flows test
│   ├── e2e2.py                    # Extended user interactions test
│   ├── sweep.py                   # 132 view sweep (desktop + mobile)
│   └── notifications.py           # Realtime notification flow test
├── package.json                   # Root orchestrator with concurrently scripts
└── README.md
```

---

## 🧪 Testing & Verification

Run tests with Playwright:
```bash
# Verify core end-to-end user flows
python3 tests/e2e.py

# Verify notification bell increment and read status
python3 tests/notifications.py

# Sweep all 132 views across Desktop (1366px) and Mobile (390px)
python3 tests/sweep.py
```
