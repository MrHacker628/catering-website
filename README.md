# 🍽️ Catering Website

A modern full-stack catering management website built using **React**, **Node.js**, **Express.js**, and **MySQL**. The application allows customers to browse catering services, submit inquiries, and enables administrators to manage services efficiently.

---

## 📌 Features

### 👥 User Features
- Browse catering services
- View service details
- Search services
- Contact form for inquiries
- Responsive design for mobile and desktop
- Clean and modern UI

### 🔐 Admin Features
- Admin Login Authentication
- Add new catering services
- Update existing services
- Delete services
- Upload service images
- Manage customer inquiries

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router
- CSS3
- Axios

### Backend
- Node.js
- Express.js
- Multer (Image Upload)
- JWT Authentication
- bcrypt.js

### Database
- MySQL

---

## 📂 Project Structure

```
catering-website/
│
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── routes/
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── Components/
│   │   ├── Pages/
│   │   ├── Context/
│   │   ├── Assets/
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## 1. Clone the Repository

```bash
git clone <repository-url>
```

```bash
cd catering-website
```

---

## 2. Install Backend Dependencies

```bash
cd backend
npm install
```

---

## 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

## 4. Configure Environment Variables

Create a `.env` file inside the **backend** folder.

Example:

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=catering_db

JWT_SECRET=your_secret_key
```

---

## 5. Import Database

Create a MySQL database:

```sql
CREATE DATABASE catering_db;
```

Import the SQL file into MySQL.

---

## 6. Start Backend

```bash
cd backend
npm start
```

or

```bash
nodemon server.js
```

---

## 7. Start Frontend

```bash
cd frontend
npm run dev
```

or

```bash
npm start
```

---

# 📷 Screenshots

Add screenshots here.

Example:

```
Home Page

Admin Dashboard

Service Page

Contact Page
```

---

# 🔒 Authentication

The admin panel is protected using:

- JSON Web Token (JWT)
- Password Hashing using bcrypt
- Protected Routes

---

# 📁 API Endpoints

### Services

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/services | Get all services |
| GET | /api/services/:id | Get single service |
| POST | /api/services | Add service |
| PUT | /api/services/:id | Update service |
| DELETE | /api/services/:id | Delete service |

---

### Authentication

| Method | Endpoint |
|---------|----------|
| POST | /api/admin/login |

---

## 🚀 Future Improvements

- Online Booking System
- Razorpay Payment Gateway
- Customer Login
- Booking History
- Email Notifications
- Review & Rating System
- Order Tracking
- Dashboard Analytics

---

## 📜 License

This project is created for educational and portfolio purposes.

---

## 👨‍💻 Author

**Abrar Shaikh**

GitHub: https://github.com/MrHacker628

LinkedIn: https://www.linkedin.com/in/abrar-shaikh-40186727b/

---

## ⭐ Support

If you found this project helpful, don't forget to give it a **⭐ Star** on GitHub.
