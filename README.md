# Student Management System  

# 🎓 Modern Full-Stack Student Management System

A simple and secure **Student Management System** built using **Java 17/21, Spring Boot 3, Spring Security 6, JWT, BCrypt, Spring Data JPA, and MySQL**.

The frontend is built using **HTML5, CSS3, Bootstrap 5, and JavaScript**.

---

## 📋 Table of Contents

* [Project Overview](#-project-overview)
* [Key Features](#-key-features)
* [Technology Stack](#-technology-stack)
* [Project Architecture](#-project-architecture)
* [Database Setup](#-database-setup)
* [Environment Variables](#-environment-variables)
* [How Authentication Works](#-how-authentication-works)
* [API Documentation](#-api-documentation)
* [How to Build & Run](#-how-to-build--run)
* [Deployment](#-deployment)
* [License](#-license)

---

## 🌟 Project Overview

The **Student Management System (SMS)** is a full-stack web application used to manage student information.

The admin can:

* Login securely
* View student statistics
* Add students
* View students
* Update student information
* Delete students
* Search students
* Filter students by department

The backend is developed using **Java Spring Boot** and the database is **MySQL**. The frontend uses **HTML, CSS, Bootstrap, and JavaScript**.

---

## ✨ Key Features

### 🔐 Secure Authentication

* Spring Security 6
* JWT Authentication
* BCrypt password encryption
* Protected APIs
* Stateless authentication

### 📊 Dashboard

The dashboard displays:

* Total Students
* Active Students
* Total Courses
* Total Departments
* Students by Department
* Students by Year

### 👥 Student Management

The system supports complete CRUD operations:

* **Create** – Add a new student
* **Read** – View student information
* **Update** – Edit student information
* **Delete** – Delete a student

### 🔍 Search and Filter

Students can be searched using:

* Name
* Email
* Course
* Department

Students can also be filtered by department.

### 📱 Responsive Design

The website works on:

* Desktop
* Laptop
* Tablet
* Mobile

### ⚡ Sample Data

The application automatically creates:

* 1 default admin
* 8 sample students

Default admin login:

```text
Username: admin
Password: Admin@123
```

---

## 🛠️ Technology Stack

### Frontend

* HTML5
* CSS3
* Bootstrap 5.3
* Bootstrap Icons
* JavaScript ES6+
* Fetch API
* LocalStorage

### Backend

* Java 17/21
* Spring Boot 3.2.5
* Spring Security 6
* JWT
* BCrypt
* Spring Data JPA
* Hibernate
* Maven
* Jakarta Bean Validation

### Database

* MySQL 8.0+
* H2 Database for development/testing

---

## 📂 Project Architecture

```text
student-management-system/
│
├── backend/
│   ├── pom.xml
│   ├── mvnw.cmd
│   │
│   └── src/
│       ├── main/
│       │   ├── java/com/studentmanagement/
│       │   │
│       │   ├── StudentManagementApplication.java
│       │   │
│       │   ├── config/
│       │   │   └── DataInitializer.java
│       │   │
│       │   ├── controller/
│       │   │   ├── AuthController.java
│       │   │   └── StudentController.java
│       │   │
│       │   ├── dto/
│       │   │   ├── LoginRequest.java
│       │   │   ├── LoginResponse.java
│       │   │   ├── RegisterRequest.java
│       │   │   ├── StudentDTO.java
│       │   │   └── StatsDTO.java
│       │   │
│       │   ├── entity/
│       │   │   ├── User.java
│       │   │   └── Student.java
│       │   │
│       │   ├── exception/
│       │   │   ├── DuplicateResourceException.java
│       │   │   ├── ErrorResponse.java
│       │   │   ├── GlobalExceptionHandler.java
│       │   │   └── ResourceNotFoundException.java
│       │   │
│       │   ├── repository/
│       │   │   ├── StudentRepository.java
│       │   │   └── UserRepository.java
│       │   │
│       │   ├── security/
│       │   │   ├── CustomUserDetailsService.java
│       │   │   ├── JwtAuthenticationFilter.java
│       │   │   ├── JwtService.java
│       │   │   └── SecurityConfig.java
│       │   │
│       │   └── service/
│       │       ├── AuthService.java
│       │       ├── StudentService.java
│       │       └── impl/
│       │           ├── AuthServiceImpl.java
│       │           └── StudentServiceImpl.java
│       │
│       └── resources/
│           ├── application.properties
│           ├── application-dev.properties
│           └── static/
│
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── dashboard.html
│   ├── students.html
│   ├── add-student.html
│   ├── edit-student.html
│   ├── profile.html
│   │
│   ├── css/
│   │   └── style.css
│   │
│   └── js/
│       ├── auth.js
│       ├── dashboard.js
│       ├── students.js
│       ├── add-student.js
│       └── edit-student.js
│
├── database.sql
└── README.md
```

---

## 🗄️ Database Setup

### Step 1: Open MySQL

Open **MySQL Workbench** or MySQL terminal.

Create the database:

```sql
CREATE DATABASE IF NOT EXISTS student_management;

USE student_management;
```

You can also run the complete SQL file:

```bash
mysql -u root -p < database.sql
```

Hibernate will automatically create/update the required tables.

---

## ⚙️ Environment Variables

The application can use environment variables for configuration.

| Variable            | Default Value      | Description         |
| ------------------- | ------------------ | ------------------- |
| `PORT`              | `8080`             | Application port    |
| `DB_URL`            | MySQL database URL | Database connection |
| `DB_USERNAME`       | `root`             | MySQL username      |
| `DB_PASSWORD`       | `root`             | MySQL password      |
| `JWT_SECRET`        | Default JWT key    | JWT signing key     |
| `JWT_EXPIRATION_MS` | `86400000`         | JWT expiration time |

JWT expiration:

```text
86400000 milliseconds = 24 hours
```

---

## 🔐 How Authentication Works

The login process works as follows:

```text
User
  │
  ▼
Login Page
  │
  ▼
Enter Username + Password
  │
  ▼
POST /api/auth/login
  │
  ▼
Spring Security
  │
  ▼
BCrypt Password Verification
  │
  ▼
JWT Token Generated
  │
  ▼
Token Sent to Frontend
  │
  ▼
Token Stored in localStorage
  │
  ▼
Dashboard
  │
  ▼
JWT Token Sent With Protected Requests
  │
  ▼
Backend Verifies JWT
  │
  ▼
Request Allowed
```

---

# 📡 API Documentation

## 1. Authentication APIs

### Register User

```http
POST /api/auth/register
Content-Type: application/json
```

Request:

```json
{
  "username": "faculty_jane",
  "email": "jane@university.edu",
  "password": "SecurePassword123",
  "role": "ROLE_ADMIN"
}
```

Response:

```json
{
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "type": "Bearer",
  "id": 2,
  "username": "faculty_jane",
  "email": "jane@university.edu",
  "role": "ROLE_ADMIN"
}
```

---

### Login

```http
POST /api/auth/login
Content-Type: application/json
```

Request:

```json
{
  "username": "admin",
  "password": "Admin@123"
}
```

Response:

```json
{
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "type": "Bearer",
  "id": 1,
  "username": "admin",
  "email": "admin@studentmanagement.com",
  "role": "ROLE_ADMIN"
}
```

---

### Get Current User

```http
GET /api/auth/me
Authorization: Bearer <token>
```

Response:

```json
{
  "id": 1,
  "username": "admin",
  "email": "admin@studentmanagement.com",
  "role": "ROLE_ADMIN"
}
```

---

# 👨‍🎓 Student APIs

All student APIs require:

```text
Authorization: Bearer <JWT_TOKEN>
```

### Get All Students

```http
GET /api/students
```

### Search Students

```http
GET /api/students?query=Computer
```

### Get Student by ID

```http
GET /api/students/{id}
```

### Create Student

```http
POST /api/students
```

Request:

```json
{
  "name": "Marcus Vance",
  "email": "marcus.vance@example.com",
  "phone": "+1-555-4321",
  "course": "B.Sc Cyber Security",
  "department": "Computer Science",
  "year": "2nd Year",
  "address": "456 Silicon Hills, Austin, TX",
  "status": "Active"
}
```

### Update Student

```http
PUT /api/students/{id}
```

### Delete Student

```http
DELETE /api/students/{id}
```

Response:

```json
{
  "message": "Student deleted successfully."
}
```

---

# 📊 Dashboard Statistics

```http
GET /api/students/stats
Authorization: Bearer <token>
```

Example response:

```json
{
  "totalStudents": 8,
  "activeStudents": 8,
  "totalCourses": 6,
  "totalDepartments": 5,
  "studentsByDepartment": {
    "Computer Science": 3,
    "Information Technology": 2,
    "Electrical Engineering": 1,
    "Mechanical Engineering": 1,
    "Civil Engineering": 1
  },
  "studentsByYear": {
    "1st Year": 2,
    "2nd Year": 2,
    "3rd Year": 2,
    "4th Year": 2
  }
}
```

---

# 🚀 How to Build & Run

## Prerequisites

Install the following:

* JDK 17 or 21+
* Maven 3.8+
* MySQL 8.0+

Check Java:

```bash
java -version
```

Check Maven:

```bash
mvn -version
```

---

## 1. Start MySQL

Make sure MySQL is running.

Create the database:

```sql
CREATE DATABASE student_management;
```

---

## 2. Go to Backend

```bash
cd backend
```

---

## 3. Run Backend

### Linux / macOS

```bash
./mvnw spring-boot:run
```

### Windows

```bash
mvnw.cmd spring-boot:run
```

---

## 4. Open the Website

Open your browser:

```text
http://localhost:8080
```

Default login:

```text
Username: admin
Password: Admin@123
```

---

# 🧪 Run Using H2 Database

If MySQL is not running, you can use the H2 development database.

### Linux / macOS

```bash
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

### Windows

```bash
mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=dev
```

---

# 📦 Create Executable JAR

Go to the backend folder:

```bash
cd backend
```

Build the project:

```bash
./mvnw clean package
```

Run the JAR:

```bash
java -jar target/student-management-1.0.0.jar
```

On Windows:

```bash
mvnw.cmd clean package
```

---

# 🌐 Frontend

The frontend is included inside the Spring Boot application.

Frontend files are stored in:

```text
src/main/resources/static/
```

After starting the backend, open:

```text
http://localhost:8080
```

No separate frontend server is required.

---

# 🐳 Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

COPY backend/target/student-management-1.0.0.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
```

Build the Docker image:

```bash
docker build -t student-management:latest .
```

Run the container:

```bash
docker run -p 8080:8080 student-management:latest
```

---

# 🔄 Complete Project Flow

```text
              STUDENT MANAGEMENT SYSTEM
                         │
                         ▼
                  Login / Register
                         │
                         ▼
                  JWT Authentication
                         │
                         ▼
                     Dashboard
                         │
             ┌───────────┼───────────┐
             ▼           ▼           ▼
          Students    Statistics   Profile
             │
       ┌─────┼─────┐
       ▼     ▼     ▼
      Add   Edit  Delete
       │     │     │
       └─────┼─────┘
             ▼
           MySQL
```

---

# 🎯 Project Summary

The **Student Management System** is a full-stack web application developed using **Java Spring Boot, Spring Security, JWT, JPA, and MySQL**.

The frontend is developed using **HTML, CSS, Bootstrap, and JavaScript**.

The system allows the admin to securely login and manage student records using CRUD operations.

It also provides:

* Dashboard statistics
* Student search
* Department filtering
* Student management
* JWT authentication
* Responsive design
* MySQL database integration

---

# 📄 License

This project is open-source and released under the **MIT License**.
