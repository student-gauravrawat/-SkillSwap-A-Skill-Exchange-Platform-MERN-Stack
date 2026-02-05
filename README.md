# 🤝 SkillSwap – Skill Exchange Platform (MERN Stack)

**SkillSwap is a full-stack skill exchange platform** built using the MERN stack, where users can share their skills with others and learn new skills for free.
The project focuses on **real-world authentication**, **secure APIs**, **clean backend architecture**, and a **responsive frontend**.


## 📌 Project Overview

**SkillSwap** allows users to exchange skills without of money. 

Each user can:

* Register and verify their email using OTP
* Login and logout securely
* Add skills they want to offer (teach)
* Add skills they want to learn
* View other users and get skill-based match results
* Update profile details and upload avatar
* Delete their account and related data
* Contact the team using the Contact Us page (email)
* (In Progress) Chat with other users using WebSockets

The main goal of this project is to practice **secure authentication**, **backend logic**, **database design**, **full-stack integration** and **try to solve social problem** — not just UI.

## 🚀 Features

## 🔑 Authentication & Security

* User registration with **email OTP verification**
* Secure login using **JWT Access Token + Refresh Token**
* Tokens stored in **HTTP-only cookies**
* Refresh token flow to keep users logged in securely
* Logout clears tokens and invalidates refresh token
* Password hashing using **bcrypt**
* Protected routes using custom JWT middleware
* Secrets managed using **.env environment variables**
* 👤 User Profile Management
* Update profile details (name, profession, location, etc.)
* Upload and update avatar using Multer + Cloudinary
* Securely delete account and related data (skills, avatar, etc.)

## 🧩 Skill Management System

* Add Offer Skills (skills you can teach)
* Add Learn Skills (skills you want to learn)
* Validation to prevent duplicate or conflicting skills
* Delete skills anytime
* Skills are linked to users using MongoDB relations
* **🔍 Search & Matching System**
* Search users based on skills
* Filter and sort results using **MongoDB aggregation pipelines**
* Show matched users based on skill intersection logic
* Exclude logged-in user’s own skills from results

## 🧠 Backend Architecture

Clean **MVC structure** (Models, Controllers, Routes)
Centralized error handling using custom error class
Reusable middleware for authentication & file upload
RESTful API design
Secure file handling with **Multer**
Image storage using **Cloudinary**

## 🎨 Frontend

* Responsive UI built with **React + Tailwind CSS**
* Global state management using **Redux Toolkit**
* State persistence using **Redux Persist**
* API handling using **Axios**
* Routing using React **Router DOM**
* User feedback using **React Hot Toast**
* Contact page integrated using **EmailJS**

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Redux Toolkit
* Redux Persist
* Tailwind CSS
* Axios
* React Router DOM
* React Hot Toast
* EmailJS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* mongoose-aggregate-paginate-v2
* JSON Web Token (JWT)
* bcrypt
* Nodemailer
* Multer
* Cloudinary
* Cookie-Parser
* CORS
* Helmet

📂 Project Structure
Backend
backend/
 ├── src/
 │   ├── controllers/
 │   ├── models/
 │   ├── routes/
 │   ├── middleware/
 │   ├── utils/
 │   ├── db/
 │   ├── app.js
 │   └── index.js
 ├── public/
 └── package.json

Frontend
frontend/
 ├── src/
 │   ├── components/
 │   ├── pages/
 │   ├── routes/
 │   ├── redux/
 │   ├── services/
 │   ├── utils/
 │   └── main.jsx
 ├── index.html
 └── package.json

## 🔐 Authentication Flow (High Level)

* User registers → OTP sent to email
* User verifies email using OTP
* User logs in → Access & Refresh tokens generated
* Tokens stored securely in **HTTP-only cookies**
* If access token expires → New token generated using refresh token
* User logs out → Tokens cleared and refresh token removed from DB

## ⚙️ Environment Variables

Create a `.env` file in the backend root:

PORT=5000
MONGODB_URI=your_mongodb_connection_string
CORS_ORIGIN=http://localhost:5173
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=7d
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret

## ▶️ How to Run the Project

### Backend

```bash
cd backend
npm install
npm run start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### 🎯 Learning Outcomes (As a Fresher)

Through this project, I learned:

* How real-world authentication works using JWT & refresh tokens
* How to secure APIs and user data
* How to design MongoDB schemas and aggregation queries
* How to structure backend code for scalability
* How frontend and backend communicate securely
* How to manage global state in React using Redux Toolkit
* How to handle file uploads and cloud storage
* How to build a production-style full-stack application

## 📌 Why This Project Matters

This project is not just a simple CRUD app. It focuses on:

* Security
* Clean backend architecture
* Real authentication flows
* Skill-based matching logic
* Production-style practices

It represents my understanding of **full-stack development** as a fresher and my readiness to work on real-world applications.

## 👤 Author

**Gaurav Rawat**
MERN Stack Developer (Fresher)