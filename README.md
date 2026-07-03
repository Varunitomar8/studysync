# StudySync

StudySync is a full-stack study planner and task management application that helps students organize their academic tasks efficiently.

---

## Tech Stack

### Frontend
- Next.js
- React
- Tailwind CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose

---

## Features

- View all study tasks
- Create new tasks
- Update existing tasks
- Delete tasks
- Store data permanently using MongoDB Atlas
- RESTful API integration

---

## Project Structure

```
StudySync
│
├── frontend
│   ├── app
│   ├── components
│   └── ...
│
├── backend
│   ├── models
│   ├── server.js
│   ├── .env.example
│   └── ...
```

---

## Installation

### Clone the repository

```bash
git clone <repository-url>
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file using `.env.example`

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Start the backend:

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Open:

```
http://localhost:3000
```

---

## API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/tasks | Get all tasks |
| GET | /api/tasks/:id | Get single task |
| POST | /api/tasks | Create task |
| PUT | /api/tasks/:id | Update task |
| DELETE | /api/tasks/:id | Delete task |

---

## Database Schema

The application uses one MongoDB collection:

**Task**

| Field | Type |
|-------|------|
| _id | ObjectId |
| title | String |
| subject | String |
| completed | Boolean |

```
Schema Diagram
<img width="304" height="280" alt="SchemaDiagram" src="https://github.com/user-attachments/assets/436fc4ee-8502-4efd-9cf7-7a8d34b0793f" />


```

---

## Environment Variables

```
PORT
MONGO_URI
```

---

## Author

Varuni
