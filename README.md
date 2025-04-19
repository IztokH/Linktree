🌳 Linktree Clone
A full-stack Linktree-style application built with React, TypeScript, Tailwind CSS, and a Node.js + Express + PostgreSQL + Sequelize backend. Users can register, log in (with Google or email), manage their personal link page, and reset passwords securely through email verification.

🚀 Features

🔐 Authentication
Register with email & password
Google OAuth login via google-auth-library
Passwords hashed with bcrypt
Email verification with secure token
Password reset via email token

👤 User Profile
Create and edit biography
Personalized Linktree page

🔗 Link Management
Add, update, and delete links

📬 Email System
Email verification and password reset via Nodemailer

🛠️ Tech Stack

Frontend:
React.js
TypeScript
Tailwind CSS

Backend:
Node.js
Express.js
PostgreSQL
Sequelize ORM
RESTful API

Security & Auth:
bcrypt
JWT
google-auth-library
Nodemailer

📦 Installation
1. Clone the repository
git clone https://github.com/your-username/linktree-clone.git
cd linktree-clone
2. Backend Setup
cd backend
npm install

Create .env file:

PORT=5000
DATABASE_URL=postgres://user:password@localhost:5432/your_db_name
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password_or_app_password

Setup the database:
npx sequelize-cli db:migrate
If you have seeders:
npx sequelize-cli db:seed:all
Make sure PostgreSQL is installed and your database is created.

Start the backend server:
npm run dev

3. Frontend Setup:
cd ../frontend
npm install
npm run dev
Visit the app at http://localhost:5173

📁 Project Structure
.
├── frontend/             # React + TypeScript + Tailwind
└── backend/
    ├── models/           # Sequelize models
    ├── routes/           # Express routes
    ├── controllers/      # Route handlers
    ├── middleware/       # Auth, error handling
    ├── utils/            # Token creation, mailer
    ├── config/           # Sequelize & env config
🌐 Usage
Register or login (email or Google)

Verify your account via email

Add a biography and multiple links

Share your public Linktree page!

🛡️ Security
Passwords hashed using bcrypt

JWT tokens for session management

Google Sign-In verified with google-auth-library

Email token system for verification & password reset

✅ TODO
 Deploy frontend (Vercel, Netlify)

 Deploy backend (Render, Railway, Heroku)

 Link click analytics

 Custom themes for users

 Image or favicon previews on links

🤝 Contributing
Feel free to fork, submit issues, or make pull requests. Contributions are welcome!

📄 License
MIT

💬 Contact
Questions? Reach out via [your-email@example.com] or open an issue.
