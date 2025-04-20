Copyright (c) 2025 Iztok Hudales

This project is licensed under the [MIT License] for general use.

Exclusive commercial rights and extended use of this software are granted to:
PIXALISE s.p. Slovenia, under the terms of our agreement dated 26.1.2025.

All other users may use this project according to the MIT License terms.

🌳 Linktree Clone:
A full-stack Linktree-style application built with React, TypeScript, Tailwind CSS for the frontend and Node.js, Express, PostgreSQL, Sequelize, and TypeScript for the backend. Users can register, log in (via email or Google), manage their public link pages, verify accounts, and securely reset passwords using tokens sent via email.

🚀 Features
- 🔐 Authentication
   - Email/password login with encrypted passwords via bcrypt
   - Google OAuth login via google-auth-library
   - JWT-based token system
   - Email verification & password reset using tokens
- 👤 User Profile
   - Create and edit biography
   - Personalized Linktree-style landing page
- 🔗 Link Management
   - Add, update, and delete links
- 📬 Email System
   - Email verification and password reset emails sent using Nodemailer
- 🛠️ Tech Stack
   - Frontend:
    - React.js
    - TypeScript
    - Tailwind CSS
   - Backend:
    - Node.js
    - Express.js
    - TypeScript
    - PostgreSQL
    - Sequelize ORM
   - Security & Tools
    - bcrypt
    - JWT
    - google-auth-library
    - Nodemailer
 - 📦 Installation
    1. Clone the repository:
      git clone https://github.com/your-username/linktree-clone.git
      cd linktree-clone
    2. Backend Setup:
      cd backend
      npm install
    3. Create .env file in backend/ :
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
    4. Sequelize Configuration
      - Create .sequelizerc in the backend/ folder:
       const path = require('path');
       module.exports = {
         config: path.resolve('src', 'config', 'config.js'),
         'models-path': path.resolve('src', 'models'),
         'seeders-path': path.resolve('src', 'seeders'),
         'migrations-path': path.resolve('src', 'migrations'),
       };
      - Run Migrations:
        npx sequelize-cli db:migrate
      - (Optional) Seed Database:
        npx sequelize-cli db:seed:all
      - Run Backend
      - For development:
         npm run dev
      - To build & run production:
         npm run build
         npm start
     5. Frontend Setup
        cd ../frontend
        npm install
        npm run dev

Visit the app at: http://localhost:5173

📁 Project Structure

backend/
├── dist/               # Compiled JS (from TypeScript)
├── node_modules/
├── src/
│   ├── config/         # Sequelize DB config
│   ├── migrations/     # DB schema migrations
│   ├── models/         # Sequelize models
│   ├── seeders/        # Optional seed data
│   ├── controllers/    # Business logic
│   ├── routes/         # Express routes
│   ├── middleware/     # Auth & error handling
│   ├── utils/          # JWT, email, tokens
│   └── index.ts        # App entry point
├── .sequelizerc
├── tsconfig.json
├── package.json
├── .env
bash
Kopiraj
Uredi
frontend/
├── src/
│   ├── components/     # React components
│   ├── pages/          # React pages (Login, Register, etc.)
│   ├── services/       # API calls
│   ├── utils/          # Helpers
│   └── App.tsx         # Main app
├── tailwind.config.js
├── tsconfig.json
├── package.json

🛡️ Security
- Passwords hashed with bcrypt
- Token-based auth with JWT
- Google Sign-In via google-auth-library
- Email verification & reset through Nodemailer

✅ TODO
 - Deploy backend (Render, Railway, etc.)
 - Deploy frontend (Vercel, Netlify)
 - Analytics for link clicks
 - Themes or user customization
 - Add profile pictures or social icons

🤝 Contributing
 - Pull requests and feedback are welcome! Please open an issue to discuss any major changes.

💬 Contact
For questions or support, reach out via [hudalesi@gmail.com].
