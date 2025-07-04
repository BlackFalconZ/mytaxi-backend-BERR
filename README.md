# MyTaxi Backend 🚕  
Backend system for ride-booking platform using Node.js, Express.js, and MongoDB.

## 📌 Project Overview
MyTaxi is a RESTful backend API that allows users to:
- Register as a driver or passenger
- Post and book rides
- Admins can view and manage all users and rides

## 🧠 Technologies Used
- Node.js
- Express.js
- MongoDB (via Mongoose)
- MongoDB Compass (local)
- Postman (for testing)
- dotenv (environment config)
- bcryptjs (password hashing)
- CORS

| Method | Endpoint    | Description            |
| ------ | ----------- | ---------------------- |
| POST   | `/register` | Register new user      |
| POST   | `/login`    | Login user             |
| GET    | `/`         | View all users (admin) |
| GET    | `/:id`      | View user by ID        |
| PUT    | `/:id`      | Update user profile    |
| DELETE | `/:id`      | Delete user            |


| Method | Endpoint    | Description            |
| ------ | ----------- | ---------------------- |
| POST   | `/`         | Create a ride (driver) |
| GET    | `/`         | View all rides         |
| PUT    | `/:id/book` | Book ride (passenger)  |


| Role      | Use Cases                                              |
| --------- | ------------------------------------------------------ |
| Passenger | Register, login, view driver, request ride, delete acc |
| Driver    | Login, post ride, view passengers, update/delete acc   |
| Admin     | View/manage users, view all rides                      |



