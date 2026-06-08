# 🔗 URL Shortener

A full-stack URL shortener built with the MERN stack. Users can sign up, log in, shorten long URLs, and view their link history.

**Live Demo:** [url-shortner-nu-swart.vercel.app](https://url-shortner-nu-swart.vercel.app)

---

## Features

- User authentication (signup & login) with JWT
- Password hashing with bcryptjs
- Input validation with Zod
- Shorten any valid URL using nanoid
- View all previously shortened URLs
- Protected routes (dashboard requires login)
- Redirect from short URL to original URL

---

## Tech Stack

**Frontend**
- React (Vite)
- React Router DOM
- Axios
- Context API + custom hooks

**Backend**
- Node.js + Express
- MongoDB Atlas + Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- Zod
- nanoid
- CORS

---

## Project Structure

```
url-shortener/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # ProtectedRoute
│   │   ├── context/        # AuthContext
│   │   ├── hooks/          # useAuth
│   │   ├── pages/          # Signup, Login, Dashboard
│   │   └── main.jsx
│   └── vercel.json
│
└── server/                 # Express backend
    ├── src/
    │   ├── middleware/      # authMiddleware
    │   ├── models/          # User, Url schemas
    │   ├── routes/          # auth, url routes
    │   ├── validators.js    # Zod schemas
    │   ├── db.js
    │   └── index.js
    └── .env
```

---

## Getting Started

### Prerequisites
- Node.js
- MongoDB Atlas account

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server/` folder:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
```

Create a `.env` file in the `client/` folder:

```
VITE_API_URL=http://localhost:3000
```

Start the frontend:

```bash
npm run dev
```

---

## API Routes

### Auth
| Method | Route | Description | Auth Required |
|--------|-------|-------------|---------------|
| POST | `/api/auth/signup` | Register a new user | No |
| POST | `/api/auth/signin` | Login and get JWT token | No |

### URL
| Method | Route | Description | Auth Required |
|--------|-------|-------------|---------------|
| POST | `/api/url/shorten` | Shorten a URL | Yes |
| GET | `/api/url/my-urls` | Get all URLs for logged-in user | Yes |
| GET | `/:shortCode` | Redirect to original URL | No |

---

## Deployment

- **Frontend:** Vercel
- **Backend:** Railway
- **Database:** MongoDB Atlas

---

## Concepts Practiced

- REST API design with Express
- JWT-based authentication flow
- Password hashing with bcrypt
- Input validation with Zod
- MongoDB relationships (User → URLs)
- React Context API for global state
- Protected routes with React Router
- `useRef` for uncontrolled inputs
- Custom React hooks
- Environment variables for deployment
