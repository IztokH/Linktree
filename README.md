🌳 Linktree Clone (Full-Stack Portfolio Project)

Author: Iztok Hudales

Copyright © 2025

📄 License & Usage

This project is licensed under the MIT License and may be freely:

viewed,

cloned,

installed,

modified,

and used for personal, educational, and portfolio purposes.

Commercial Use

Exclusive commercial rights and extended commercial use of this software are granted to:

PIXALISE s.p., Slovenia,

under the terms of an agreement dated 26.1.2025.

❗ Commercial use by third parties is not permitted without explicit authorization.

Portfolio & Demonstration Use

✅ Users are explicitly allowed to:

run the project locally,

deploy it for testing or demonstration,

include it in personal portfolios,

present it as an example of technical work,

without requesting permission from PIXALISE.

📌 Overview

A full-stack Linktree-style web application built to showcase modern web development practices.

Users can:

register and log in using email/password or Google OAuth,

create and manage a public profile page,

add, update, and delete custom links,

verify their email and reset passwords securely via email tokens.

This project is intended for learning, demonstration, and portfolio presentation.

🚀 Features

🔐 Authentication

Email & password authentication (bcrypt hashing)

Google OAuth login

JWT-based authentication

Email verification

Secure password reset with tokens

👤 User Profile

Create and edit biography

Personalized public Linktree-style landing page

🔗 Link Management

Add, update, and delete links

Public profile page accessible via URL

📬 Email System

Email verification

Password reset emails

Implemented using Nodemailer

🛠️ Tech Stack
Frontend
-React
-TypeScript
-Tailwind CSS
Backend
-Node.js
-Express.js
-TypeScript
-PostgreSQL
-Sequelize ORM
Security & Tools
-bcrypt
-JSON Web Tokens (JWT)
-google-auth-library
-Nodemailer
👤 How Users Test the App
-Register a new account (email or Google)
-Verify email address
-Log in
-Create a profile
-Add and manage links
-Share the public profile URL
📦 Installation (Local Development)
🔧 Prerequisites
-Node.js v18+
-npm
-PostgreSQL (running locally)

1️⃣ Clone the repository (in command prompt)

git clone https://github.com/your-username/linktree-clone.git
cd linktree-clone

2️⃣ Backend setup (in command prompt)
cd backend
npm install

Create a .env file in backend/:

PORT=5000

DB_USER=your_pg_user
DB_PASS=your_pg_password
DB_NAME=your_database
DB_HOST=localhost
DATABASE_URL=postgres://your_pg_user:your_pg_password@localhost:5432/your_database

JWT_SECRET=your_jwt_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password_or_app_password

3️⃣ Sequelize configuration

Create .sequelizerc in backend/:

const path = require('path');

module.exports = {
  config: path.resolve('src', 'config', 'config.js'),
  'models-path': path.resolve('src', 'models'),
  'seeders-path': path.resolve('src', 'seeders'),
  'migrations-path': path.resolve('src', 'migrations'),
};

Run migrations (in command prompt):

npx sequelize-cli db:migrate

(Optional) Seed database:

npx sequelize-cli db:seed:all

4️⃣ Run backend (in command prompt)
npm run dev

Backend runs at:

http://localhost:5000

5️⃣ Frontend setup (in command prompt)
cd ../frontend
npm install
npm start

Frontend runs at:

http://localhost:3000

📁 Project Structure
backend/
 ├── dist/              # Compiled JavaScript
 ├── src/
 │   ├── config/        # Sequelize DB config
 │   ├── migrations/    # Database migrations
 │   ├── models/        # Sequelize models
 │   ├── seeders/       # Optional seed data
 │   ├── controllers/  # Business logic
 │   ├── routes/        # Express routes
 │   ├── middleware/   # Auth & error handling
 │   ├── utils/         # JWT, email, tokens
 │   └── index.ts       # App entry point
 ├── .sequelizerc
 ├── tsconfig.json
 ├── package.json
 └── .env

frontend/
 ├── src/
 │   ├── components/    # React components
 │   ├── pages/         # Login, Register, Profile, etc.
 │   ├── services/      # API calls
 │   ├── utils/         # Helpers
 │   └── App.tsx        # Main app
 ├── tailwind.config.js
 ├── tsconfig.json
 └── package.json

🛡️ Security

-Passwords hashed using bcrypt
-JWT-based authentication
-Google OAuth integration
-Secure email verification and password reset

✅ TODO / Future Improvements

-Deploy backend (Render, Railway, etc.)
-Deploy frontend (Vercel, Netlify)
-Link click analytics
-Themes and user customization
-Profile pictures and social icons

🤝 Contributing

Pull requests and feedback are welcome.
Please open an issue to discuss any major changes.
