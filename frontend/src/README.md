# AI Task Manager 🚀

An AI-powered full stack task management application built using:

- React JS
- Spring Boot
- MySQL
- JWT Authentication
- Groq AI API

---

# Features

✅ User Registration & Login  
✅ JWT Authentication  
✅ Create / Update / Delete Tasks  
✅ AI Task Description Generation  
✅ Dashboard Statistics  
✅ Search & Filter Tasks  
✅ Priority Colors  
✅ Overdue Task Detection  
✅ Responsive UI

---

# Tech Stack

## Frontend

- React JS
- Tailwind CSS
- Axios
- React Router DOM

## Backend

- Spring Boot
- Spring Security
- JWT
- Spring Data JPA

## Database

- MySQL

## AI Integration

- Groq API

---

# Project Structure

## Frontend

```bash
src/
│
├── pages/
│   ├── Login.jsx
│   └── Dashboard.jsx
│
├── services/
│   └── api.js
│
├── App.jsx
└── main.jsx
```

## Backend

```bash
src/main/java/com/anil/taskmanager
│
├── Controller
├── Service
├── Repository
├── Entity
├── DTO
├── Security
└── Exception
```

---

# Setup Instructions

## Frontend

```bash
npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

## Backend

```bash
mvn spring-boot:run
```

Backend runs on:

```bash
http://localhost:8181
```

---

# API Endpoints

## Authentication

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | /api/auth/register |
| POST   | /api/auth/login    |

## Tasks

| Method | Endpoint        |
| ------ | --------------- |
| GET    | /api/tasks      |
| POST   | /api/tasks      |
| PUT    | /api/tasks/{id} |
| DELETE | /api/tasks/{id} |

## AI

| Method | Endpoint         |
| ------ | ---------------- |
| POST   | /api/ai/generate |

---

# AI Integration

Groq AI API is used to generate intelligent task descriptions dynamically.

Example:

Input:

```json
{
  "title": "Prepare Client Presentation"
}
```

AI Output:

- Description
- Priority
- Estimated Time

---

# Author

Pullagura Anil
