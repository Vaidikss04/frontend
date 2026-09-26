# 🎫 Event Management System

A simple and user-friendly **Event Management System** designed to make it easier for administrators to manage events and for users to discover and register for events.

The project is built using **HTML, CSS, and JavaScript**, with **Local Storage** used for storing user, event, and registration data.

---

## 📌 Problem Statement

Managing events manually can be time-consuming and difficult, especially when handling event details, participant registrations, and user information.

This project provides a **centralized platform** where:

* Admins can create and manage events.
* Users can browse available events.
* Users can view event details and register.
* Event and registration information can be managed in an organized way.

---

## 🎯 Objectives

* Provide a centralized platform for event management.
* Simplify event creation and management.
* Make event discovery easier for users.
* Provide simple online event registration.
* Maintain organized user and registration records.
* Provide separate interfaces for **Admin** and **User**.

---

## 🚀 Features

### 👨‍💼 Admin Module

* Admin Login
* Admin Dashboard
* Add new events
* Edit existing events
* Delete events
* View registered users
* Manage event information
* Monitor registrations

### 👤 User Module

* User Signup
* User Login
* User Dashboard
* Browse available events
* Search and filter events
* View event details
* Register for events
* View registered events
* Logout

---

## 🛠️ Technologies Used

| Technology        | Purpose                                   |
| ----------------- | ----------------------------------------- |
| **HTML5**         | Structure of web pages                    |
| **CSS3**          | Styling, layout and responsive UI         |
| **JavaScript**    | Application functionality and interaction |
| **Local Storage** | Storing users, events and registrations   |

### Why these technologies?

The project requirements restrict the application to **HTML, CSS and JavaScript**, without using a backend or external database.

Therefore, JavaScript and Local Storage are used to provide the required functionality while keeping the project simple and lightweight.

---

## 📂 Project Structure

```text
Event-Management-System/
│
├── index.html
├── login.html
├── signup.html
│
├── admin/
│   ├── dashboard.html
│   ├── admin-dashboard.html
│   ├── manage-events.html
│   ├── add-event.html
│   └── users.html
│
├── user/
│   ├── dashboard.html
│   ├── user-dashboard.html
│   ├── events.html
│   ├── event-details.html
│   └── my-events.html
│
├── css/
│   ├── style.css
│   ├── dashboard.css
│   └── login.css
│
└── js/
    ├── auth.js
    ├── events.js
    ├── admin.js
    └── user.js
```

---

## 🔄 How It Works

### Admin Flow

```text
Admin Login
     ↓
Admin Dashboard
     ↓
Manage Events
     ↓
Add / Edit / Delete Events
     ↓
Manage Users & Registrations
```

### User Flow

```text
Signup / Login
      ↓
User Dashboard
      ↓
Browse Events
      ↓
View Event Details
      ↓
Register for Event
      ↓
My Events
```

---

## 💾 Data Storage

The project uses **Browser Local Storage** to maintain application data.

The main storage keys are:

```text
ems_users
ems_events
ems_registrations
ems_session
```

This allows the application to maintain data even after refreshing the page.

> **Note:** Since this is a frontend-only project, the data is stored locally in the browser and is not shared between different devices.

---

## 🔐 Authentication

The system provides separate authentication for:

* **Admin**
* **Users**

After login, users are redirected to the appropriate dashboard based on their role.

### Default Admin Account

```text
Email: admin@campus.edu
Password: admin123
```

> This default account is intended for demonstration purposes.

---

## 🎨 User Interface

The interface is designed to be simple, clean and easy to navigate.

The project uses:

* CSS Grid
* Flexbox
* Responsive layouts
* Cards and dashboards
* Navigation menus
* Forms and interactive components

---

## ✅ Benefits

### For Admins

* Reduces manual event management.
* Makes event updates easier.
* Provides organized participant information.
* Simplifies event monitoring.

### For Users

* Easy access to available events.
* Quick event registration.
* Easy access to event information.
* Ability to track registered events.

### Overall

* Centralized event management.
* Better organization.
* Reduced manual work.
* Convenient event registration.
* Simple and user-friendly interface.

---

## 🔮 Future Scope

The system can be further improved by adding:

* ☁️ Cloud database integration
* 📧 Email notifications
* 💳 Online payment integration
* 🎟️ QR-based event tickets
* 📊 Event analytics and reports
* 🔐 Secure backend authentication
* 📱 Mobile application
* 🔔 Real-time notifications

---

## ▶️ How to Run the Project

### 1. Clone the repository

```bash
git clone https://github.com/your-username/Event-Management-System.git
```

### 2. Open the project

Open the project folder in **Visual Studio Code**.

### 3. Run the application

You can use the **Live Server** extension in VS Code.

Right-click:

```text
index.html
```

and select:

```text
Open with Live Server
```

The application will open in your browser.

---

## 🧪 Demo Credentials

### Admin

```text
Email: admin@campus.edu
Password: admin123
```

### User

Create a new account through the **Signup** page.

---

## 📸 Project Preview

*Add screenshots of the application here.*

Example:

```text
![Home Page](screenshots/home.png)
![Admin Dashboard](screenshots/admin-dashboard.png)
![Events Page](screenshots/events.png)
![User Dashboard](screenshots/user-dashboard.png)
```

---

## 👨‍💻 Project Information

**Project:** Event Management System
**Type:** Web Application
**Frontend:** HTML, CSS, JavaScript
**Data Storage:** Browser Local Storage

---

## 📄 License

This project was developed for **academic/educational purposes**.
