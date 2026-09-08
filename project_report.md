# Project Report: Student Management System

---

## 1. Title Page

**PROJECT TITLE:** Student Management System  
**SUBMITTED FOR:** Academic Evaluation / Degree Project  
**DEVELOPED BY:** [Student Name]  
**ROLL NUMBER:** [Roll Number]  
**GUIDED BY:** [Professor/Mentor Name]  
**DEPARTMENT:** Computer Science & Engineering  
**ACADEMIC YEAR:** 2026  

---

## 2. Abstract

The **Student Management System (SMS)** is a web-based application designed to streamline the administration of student information. Traditional systems often involve manual record-keeping or fragmented databases, leading to inefficiency and data inconsistency. This project presents a full-stack, lightweight web solution utilizing **Java Spring Boot** for the RESTful backend services, **MySQL** for relational database storage, and **HTML5, CSS3, JavaScript, and Bootstrap 5** for an intuitive, responsive frontend dashboard. The system implements full Create, Read, Update, and Delete (CRUD) operations, client-server validation protocols, and dynamic search capabilities. The resulting application is easy to understand, deploy, and scale, serving as an optimal prototype for academic registration systems.

---

## 3. Introduction

With the rapid digitization of educational institutions, maintaining student data on paper registers is no longer viable. Administrative bodies require electronic portals that can securely store and update student profiles in real-time. 

This Student Management System serves as a core administrative interface. It demonstrates the seamless integration of a model-driven backend with a lightweight web frontend. By establishing clean design boundaries:
- **Model** represents database rows.
- **Repository** defines access interfaces.
- **Service** holds standard business rules.
- **Controller** exposes clean HTTP endpoints.
- **Frontend** offers responsive forms and table views.

The codebase is engineered strictly with high readability and simplicity, making it ideal for educational projects, vivas, and fundamental learning.

---

## 4. Problem Statement

Modern educational environments demand swift access to student records. Traditional paper-based directories or basic spreadsheet programs present several severe drawbacks:
- **High Data Redundancy:** Multiple copies of identical records exist, leading to discrepancies.
- **Lack of Real-time Collaborative Editing:** Multi-user updates override each other.
- **Inefficient Searching:** Accessing records manually or through filters in bulky sheets becomes slow as records grow.
- **No Input Validation:** Erroneous formats (e.g. invalid emails, negative ages) corrupt dataset integrity.

This project addresses these issues by introducing a centralized database model controlled by a Spring Boot backend API with strict validation rules.

---

## 5. Objectives

The primary goals of this project include:
1. Developing a clean RESTful API to manage student records.
2. Integrating a persistent MySQL database using Hibernate ORM to automatically map and save Java objects.
3. Structuring a responsive front-end dashboard accessible on Mobile, Tablet, and Desktop.
4. Implementing frontend validation to provide immediate feedback and backend validation to protect raw data.
5. Making the system lightweight, using zero heavy UI frameworks (such as React or Angular) to focus on fundamental web components (Fetch API, DOM manipulation).

---

## 6. Technologies Used

### Frontend Components
- **HTML5:** Structures forms, tables, navigation headers, and pages.
- **CSS3 & Bootstrap 5:** Provides modern, responsive styling, flexbox grids, clean tables, alerts, and custom layouts.
- **Vanilla JavaScript & Fetch API:** Executes async GET, POST, PUT, and DELETE calls without page reloads.

### Backend Components
- **Java 17 JDK:** Modern Java environment support.
- **Spring Boot 3.2.2:** Core framework for application bootstrap.
  - **Spring Web:** Handles MVC routing and JSON serializers/deserializers.
  - **Spring Data JPA:** Simplifies data-source access using repository interfaces.
- **Hibernate:** Standard JPA ORM provider.
- **Maven:** Packages, builds, and resolves project dependencies.

### Database Component
- **MySQL:** Stably stores relational tables with Primary Keys and Auto-Increments.

---

## 7. System Requirements

### Hardware Requirements
- **Processor:** Intel Core i3 (or AMD equivalent) 2.0 GHz or higher.
- **Memory:** Minimum 4 GB RAM (8 GB recommended for running IDEs and MySQL concurrently).
- **Storage:** Minimum 1 GB available disk space.

### Software Requirements
- **Operating System:** Windows 10/11, macOS, or Linux.
- **Java Development Kit (JDK):** Version 17 or higher.
- **Database Server:** MySQL 8.0 or higher.
- **Web Browser:** Google Chrome, Mozilla Firefox, Microsoft Edge, or Safari.
- **Build Tool:** Maven 3.8+.
- **Development Tool (IDE):** IntelliJ IDEA Community/Ultimate or Eclipse.

---

## 8. System Architecture

The application implements a classic **Three-Tier Architecture** that enforces separation of concerns:

```text
  [ User Browser / UI ] (Presentation Tier: HTML, CSS, Vanilla JS)
           ▲
           │ HTTP Request (JSON) / HTTP Response (JSON)
           ▼
  [ Spring Boot Backend ] (Application Tier)
     ├─ Controller (REST endpoints validation)
     ├─ Service (Logical handlers)
     └─ Repository (Data mapping)
           ▲
           │ JDBC Connection / JPA Hibernate SQL Queries
           ▼
  [ MySQL Database ] (Data Tier: "student_db" schema)
```

1. **Presentation Tier (Client):** Consists of static HTML views. When interactions occur, JavaScript fetches data in the background and modifies the page DOM.
2. **Application Tier (Server):** Receives HTTP requests. The controller validates payload schemas, the service runs transactional checks, and the repository calls Hibernate.
3. **Data Tier (Database):** Holds structured tables, performs indexing, and guarantees data durability.

---

## 9. Database Design

The relational database designed for this application is simplified to represent a single core entity schema.

### Database Schema: `student_db`
- **Table Name:** `students`

### Column Specifications
| Column Name | Data Type | Key Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `INT` / `BIGINT` | PRIMARY KEY, AUTO_INCREMENT | Unique student identifier |
| `name` | `VARCHAR(100)` | NOT NULL | Full name of the student |
| `email` | `VARCHAR(100)` | NOT NULL | Personal email (validated format) |
| `phone` | `VARCHAR(15)` | Optional | Contact phone number |
| `course` | `VARCHAR(100)` | NOT NULL | Major/course enrolled |
| `age` | `INT` | NOT NULL | Valid age of the student (1 to 120) |

---

## 10. Entity-Relationship (ER) Diagram

Since this is a fundamental CRUD project, it focuses on one major entity: **Student**. Below is the entity layout:

```text
  +-------------------------------------+
  |               STUDENT               |
  +-------------------------------------+
  | pk | id     : BIGINT (Auto Increment) |
  |    | name   : VARCHAR(100)           |
  |    | email  : VARCHAR(100)           |
  |    | phone  : VARCHAR(15)            |
  |    | course : VARCHAR(100)           |
  |    | age    : INT                    |
  +-------------------------------------+
```

---

## 11. Project Structure

Refer to the visual tree representing our codebase:
- **`backend/pom.xml`**: Manages backend library dependencies.
- **`backend/src/main/resources/application.properties`**: Setup parameters for Spring database connection.
- **`backend/src/main/resources/static/`**: Contains index.html, add-student.html, edit-student.html, css/style.css, and js/app.js.
- **`backend/src/main/java/`**: Houses controllers, services, repositories, models, and application classes.

---

## 12. API Documentation

Endpoints exposed by `StudentController` at `/api/students`:

### 1. Retrieve Students
- **URL:** `/api/students`
- **Method:** `GET`
- **Params:** `search` (Optional name string)
- **Response:** `200 OK` with JSON array.

### 2. Retrieve Student by ID
- **URL:** `/api/students/{id}`
- **Method:** `GET`
- **Response:** `200 OK` with JSON object OR `404 Not Found` if student ID does not exist.

### 3. Create Student
- **URL:** `/api/students`
- **Method:** `POST`
- **Request Body (JSON):** Contains name, email, phone, course, and age.
- **Response:** `201 Created` with created JSON object OR `400 Bad Request` if validations fail.

### 4. Update Student
- **URL:** `/api/students/{id}`
- **Method:** `PUT`
- **Request Body (JSON):** Updated fields.
- **Response:** `200 OK` with updated JSON object OR `400 Bad Request` / `404 Not Found`.

### 5. Delete Student
- **URL:** `/api/students/{id}`
- **Method:** `DELETE`
- **Response:** `200 OK` with success message OR `404 Not Found`.

---

## 13. Screenshots

*Placeholder section for student documentation layout.*
Include the following visual screenshots:
1. **Student Dashboard (`screenshots/01_dashboard.png`):** Shows table view list of students and the registered count.
2. **Add Student Form (`screenshots/02_add_student.png`):** Form filling stage.
3. **Edit Student Form (`screenshots/04_edit_student.png`):** Input modification screen pre-filled.
4. **Delete Confirmation Pop-up (`screenshots/05_delete_confirm.png`):** Confirm dialog warning.

---

## 14. Testing

### Unit and API Endpoint Integration Testing
Manual API validation is performed using Postman.

#### Sample POST Create Request:
- **URL:** `http://localhost:8080/api/students`
- **Body:**
```json
{
  "name": "Sneha Shinde",
  "email": "sneha.shinde@example.com",
  "phone": "9823456789",
  "course": "Information Technology",
  "age": 20
}
```
- **Response Status:** `201 Created`

#### Validation Testing (Invalid Input):
- **Request (Missing Name & Invalid Email):**
```json
{
  "name": "",
  "email": "invalid-email",
  "course": "IT",
  "age": -5
}
```
- **Response Status:** `400 Bad Request`
- **Payload:** `{"error": "Name is required and cannot be empty.", "status": "400"}`

---

## 15. Deployment

```text
Local Development ──► GitHub ──► Cloud Deployment (Render/AWS) ──► Live Application
```

### Local Deployment
1. Start MySQL database and run script in `database.sql`.
2. Configure credentials in `application.properties`.
3. Open project, build using Maven `mvn clean package`.
4. Start app: `java -jar target/student-management-0.0.1-SNAPSHOT.jar`.

### Production/Cloud Deployment Recommendation
- **Backend hosting:** Render, Railway, or AWS Elastic Beanstalk (supporting Java JAR running).
- **Database hosting:** Railway MySQL, Aiven, or AWS RDS MySQL.
- **Frontend hosting:** Serves directly from Spring Boot resource directory (`/static`), requiring no separate frontend deploy pipelines.

---

## 16. Advantages

- **Simplistic Architecture:** Avoids overly complex design structures (DTO wrappers, factory injection, custom converters) to make code beginner friendly.
- **Highly Responsive:** Using Bootstrap ensures it works seamlessly across screens.
- **Self-contained frontend:** Static assets are served directly from Spring Boot, eliminating CORS config complications.
- **Automated DB Synchronization:** Hibernate handles updating schemas without complex migration scripts.

---

## 17. Limitations

- **Security:** Lacks encryption, login authentication (e.g. Spring Security / JWT), or role-based user separation (Admin vs. Student).
- **Scalability:** Large numbers of student rows will slow down UI loading without implementation of backend pagination and database indexing.
- **Relation Constraints:** Courses are stored as raw strings rather than distinct joined tables.

---

## 18. Future Scope

1. **Authentication:** Integrate Spring Security using JWT for login screens.
2. **Audit Trails:** Save timestamps for when a record is created or modified.
3. **Database Relationships:** Create a Separate `Course` entity and establish a `Many-to-Many` relationship with `Student`.
4. **Excel Export:** Build service buttons to download lists as CSV or PDF files.

---

## 19. Conclusion

The Student Management System successfully achieves all its primary objectives. It introduces a lightweight, robust full-stack solution to replace manual student logs. By combining Spring Boot's API robustness with JavaScript's reactive fetch mechanism, it implements a highly responsive dashboard with input validation. The codebase serves as a solid foundation for more advanced modules.

---

## 20. References

1. Spring Boot Documentation: [https://spring.io/projects/spring-boot](https://spring.io/projects/spring-boot)
2. MDN Web Docs (JavaScript Fetch): [https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
3. Bootstrap 5 Official Docs: [https://getbootstrap.com/docs/5.3/getting-started/introduction/](https://getbootstrap.com/docs/5.3/getting-started/introduction/)
4. MySQL Reference Manual: [https://dev.mysql.com/doc/](https://dev.mysql.com/doc/)
