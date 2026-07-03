# StudySync Backend

## Description

StudySync Backend is built using Express.js. It provides REST APIs for managing study tasks.

## Technologies Used

- Node.js
- Express.js
- CORS
- Dotenv

## Installation

Clone the repository and navigate to the backend folder.

```bash
npm install
```

## Run the Server

```bash
npm run dev
```

The backend runs on:

```
http://localhost:5000
```

## API Endpoints

### GET all tasks

```
GET /api/tasks
```

### GET single task

```
GET /api/tasks/:id
```

### Create a task

```
POST /api/tasks
```

### Update a task

```
PUT /api/tasks/:id
```

### Delete a task

```
DELETE /api/tasks/:id
```

### Search tasks

```
GET /api/tasks/search?q=keyword
```

## Environment Variables

Create a `.env` file in the backend folder.

Example:

```
PORT=5000
```