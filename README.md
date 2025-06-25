
# MERN Task Manager

A full-stack Task Manager application built with the MERN stack (MongoDB, Express, React, Node.js) featuring user authentication with JWT and styled using TailwindCSS.

---

## Features

- User registration and login with JWT authentication
- Create, Read, Update, Delete (CRUD) tasks
- Tasks are user-specific and securely protected by authentication
- Responsive UI built with React and TailwindCSS
- Token stored in `localStorage` for persistent sessions

---

## Tech Stack

- **Frontend:** React, TailwindCSS, Fetch API
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT
- **Authentication:** JSON Web Tokens (JWT)

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB running locally or a cloud MongoDB URI

---

### Backend Setup

1. Clone the repo and navigate to the backend folder (if split):

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root of backend with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

4. Start the backend server:

```bash
npm run dev
```

The backend server will run on `http://localhost:3000`.

---

### Frontend Setup

1. Navigate to frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the React development server:

```bash
npm start
```

The frontend will be available at `http://localhost:3000`.

---

## Usage

1. Register a new user or login with existing credentials.
2. Create, view, update, and delete tasks.
3. Tasks are associated with the logged-in user.
4. Logout to clear session.

---

## Project Structure

```
/server
  ├── controllers/
  ├── middleware/
  ├── models/
  ├── routes/
  ├── server.js
  ├── .env
/client
  ├── src/
      ├── components/
      │   ├── Login.jsx
      │   ├── TaskList.jsx
      │   ├── TaskForm.jsx
      ├── App.jsx
      ├── index.css
      ├── main.js
  ├── vite.config.js
```

---

## Important Notes

- JWT tokens are stored in `localStorage`. For production apps, consider more secure storage methods such as HttpOnly cookies.
- Ensure your backend API URL matches the URL used in frontend fetch calls (`http://localhost:5000` by default).
- Handle CORS properly in backend if frontend and backend run on different origins.

---

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

## License

MIT License.
