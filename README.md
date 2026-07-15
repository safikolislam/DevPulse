# 🚼 DevPulse

A RESTful backend API for reporting bugs and feature requests, built with **Node.js, Express.js, TypeScript, PostgreSQL, and Raw SQL**.

---

## 🚀 Features

- JWT Authentication
- Role-based Authorization (Contributor & Maintainer)
- Password Hashing with bcrypt
- CRUD Operations for Issues
- Filtering & Sorting
- Raw SQL (No ORM / No JOIN)
- Global Error Handling

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- pg
- bcrypt
- jsonwebtoken
- dotenv
- http-status-codes

---

## 📦 Installation

```bash
git clone <repository_url>
cd devpulse
npm install
```

Create a `.env` file:

```env
PORT=5000
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
```

Run the project:

```bash
npm run dev
```

---

## 📌 API Endpoints

### Authentication

| Method | Endpoint |
|--------|----------|
| POST | `/api/auth/signup` |
| POST | `/api/auth/login` |

### Issues

| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/api/issues` | Authenticated |
| GET | `/api/issues` | Public |
| GET | `/api/issues/:id` | Public |
| PATCH | `/api/issues/:id` | Owner/Maintainer |
| DELETE | `/api/issues/:id` | Maintainer |

---

## 👥 Roles

### Contributor

- Register & Login
- Create Issues
- View Issues
- Update Own Open Issues

### Maintainer

- All Contributor Permissions
- Update Any Issue
- Delete Any Issue
- Change Issue Status

---

## 📄 API Response

### Success

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

### Error

```json
{
  "success": false,
  "message": "Operation failed",
  "errors": {}
}
```

---

## 🎤 Technical Interview Answers

### 1. How does the Node.js event loop execute asynchronous tasks without blocking the single main thread?

Node.js executes JavaScript on a single thread. Long-running tasks such as database queries or file operations are delegated to the operating system or thread pool. When those tasks finish, their callbacks are added to a queue. The event loop executes these callbacks once the call stack is empty, allowing Node.js to handle many requests without blocking the main thread.

### 2. What are the main differences between SQL (PostgreSQL) and NoSQL (MongoDB) regarding schema design and scaling?

**PostgreSQL (SQL)**

- Fixed schema
- Relational tables
- ACID transactions
- Best for structured data
- Primarily scales vertically

**MongoDB (NoSQL)**

- Flexible schema
- Document-based storage
- Best for unstructured or changing data
- Designed for horizontal scaling through sharding

---

## 👨‍💻 Author

**MD SAFIKOL ISLAM**