# FuelChek - Advanced Fuel & Mileage Tracker v2.0 🚗⛽

**FuelChek** is a modern, full-stack web application designed to help vehicle owners track their fuel consumption, calculate mileage, and monitor maintenance schedules. Built with a focus on usability and aesthetics, it features a glassmorphism-inspired UI and comprehensive analytics.

![FuelChek Dashboard](https://via.placeholder.com/1200x600?text=FuelChek+Dashboard+Preview)

## 🚀 Key Features

*   **Vehicle Management**: Add and manage multiple vehicles (Bikes, Cars, TukTuks, etc.).
*   **Fuel Tracking**: Log fuel entries with details like odometer reading, liters, and cost.
*   **Smart Analytics**:
    *   **Automated Mileage Calculation**: Instantly see your km/L performance.
    *   **Interactive Charts**: Visualize cost trends and mileage history over time.
*   **Service Reminders**: Set and track maintenance schedules (Next Service Date/Odometer).
*   **Modern UI/UX**:
    *   Premium "Glassmorphism" design.
    *   Responsive layout for desktop and mobile.
    *   Dark/Light mode ready aesthetics.
*   **Secure Authentication**: JWT-based login and registration system.
*   **Admin System**: Special super-admin privileges.

### 🌟 New in v2.0
*   **Mindful UI Theme**: A completely redesigned "Mindful Nature" interface using calming Teals, warm Oranges, and dark glassmorphism.
*   **Analytics Dashboard**: Visual charts for mileage trends and cost history.
*   **Service Reminders**: Dedicated module to track and update maintenance schedules.

## 🛠️ Tech Stack

*   **Frontend**: React (Vite), Tailwind CSS (v4), Recharts, Lucide Icons, Axios.
*   **Backend**: Node.js, Express.js.
*   **Database**: MySQL (using Sequelize ORM).
*   **Docs**: Swagger UI for API documentation.

## 📦 Installation & Setup

### Prerequisites
*   Node.js (v18+)
*   MySQL Server (Running locally or remotely)

### 1. Clone the Repository
```bash
git clone https://github.com/macamisp/fule-chek.git
cd fule-chek
```

### 2. Backend Setup
```bash
cd backend
npm install
```
*   Create a `.env` file in the `backend` folder:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=fule-chek
JWT_SECRET=your_jwt_secret_key
```
*   Start the server:
```bash
npm start
```
*The database and admin user will be created automatically.*

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🔑 Login Credentials

**Super Admin:**
*   **Email:** `admin@gmail.com`
*   **Password:** `admin 1234`

## 📖 API Documentation
Once the backend is running, access the full Swagger API docs at:
`http://localhost:5000/api-docs`

## 🤝 Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## 📄 License
This project is licensed under the MIT License.
