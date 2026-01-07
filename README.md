# 🌍 Local Guide Platform Backend API

This is the backend server for **LocalGuide**, a travel platform connecting tourists with local guides. It handles authentication, tour management, bookings, payments (Stripe), and reviews.

## 🚀 Features

* **Authentication & Authorization**:
    * Secure User Registration & Login (JWT-based).
    * Role-based Access Control (Admin, Guide, Tourist).
* **Tour Management**:
    * Guides can create, update, and manage tours.
    * Upload multiple images for tours.
    * Category filtering and search functionality.
* **Booking System**:
    * Tourists can book available slots.
    * Real-time availability checks.
    * Booking status tracking (Pending, Confirmed, Cancelled).
* **Payment Integration**:
    * Secure payments using **Stripe**.
    * Webhook/Confirmation support for successful transactions.
    * Invoice generation data support.
* **Review System**:
    * Verified tourists can review tours they have booked.
    * Rating calculation (Average ratings per tour).
* **Dashboard Support**:
    * APIs for User, Guide, and Admin dashboards.

---

## 🛠️ Tech Stack

* **Runtime**: [Node.js](https://nodejs.org/)
* **Framework**: [Express.js](https://expressjs.com/)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Database**: [MongoDB](https://www.mongodb.com/) (Mongoose ODM)
* **Authentication**: JSON Web Token (JWT) & bcrypt
* **Payments**: Stripe API
* **Validation**: Zod
* **Logging**: Winston (Optional/Configurable)

---

## 📂 Project Structure

```bash
src/
├── app/
│   ├── middlewares/    # Auth & Global Error Handlers
│   ├── modules/        # Feature-based Modules
│   │   ├── auth/       # Login/Register Logic
│   │   ├── user/       # User Management
│   │   ├── tour/       # Tour CRUD
│   │   ├── booking/    # Booking Logic
│   │   ├── payment/    # Stripe Integration
│   │   └── review/     # Rating & Review Logic
│   └── routes/         # Central Route Configuration
├── config/             # Environment Variables Config
├── interfaces/         # Global TypeScript Interfaces
├── utils/              # Helper Functions (catchAsync, sendResponse)
├── app.ts              # Express App Entry Point
└── server.ts           # Server Startup & Database Connection