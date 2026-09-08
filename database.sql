-- ==========================================================
-- Student Management System Database Schema & Initial Data
-- Database: MySQL 8.0+
-- ==========================================================

CREATE DATABASE IF NOT EXISTS `student_management`
DEFAULT CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE `student_management`;

-- ----------------------------------------------------------
-- Table structure for table `users`
-- ----------------------------------------------------------
DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(50) NOT NULL UNIQUE,
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `role` VARCHAR(30) NOT NULL DEFAULT 'ROLE_ADMIN',
    INDEX `idx_users_username` (`username`),
    INDEX `idx_users_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------
-- Table structure for table `students`
-- ----------------------------------------------------------
DROP TABLE IF EXISTS `students`;

CREATE TABLE `students` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `phone` VARCHAR(25) NOT NULL,
    `course` VARCHAR(100) NOT NULL,
    `department` VARCHAR(100) NOT NULL,
    `academic_year` VARCHAR(30) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `status` VARCHAR(20) NOT NULL DEFAULT 'Active',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_students_email` (`email`),
    INDEX `idx_students_department` (`department`),
    INDEX `idx_students_course` (`course`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------
-- Default Seed Data
-- Administrator Password: Admin@123 (BCrypt hash)
-- ----------------------------------------------------------
INSERT INTO `users` (`username`, `email`, `password`, `role`) VALUES
('admin', 'admin@studentmanagement.com', '$2a$10$wT8m9M7gWdKxI6bFkGz6eO8RzK09pQlL4P3K1hH.O9eKjM3F4K7mS', 'ROLE_ADMIN');

-- ----------------------------------------------------------
-- Sample Students Data
-- ----------------------------------------------------------
INSERT INTO `students` (`name`, `email`, `phone`, `course`, `department`, `academic_year`, `address`, `status`) VALUES
('Alex Johnson', 'alex.johnson@example.com', '+1-555-0101', 'B.Sc Computer Science', 'Computer Science', '3rd Year', '104 Tech Boulevard, San Jose, CA', 'Active'),
('Sophia Martinez', 'sophia.martinez@example.com', '+1-555-0102', 'B.Tech Information Technology', 'Information Technology', '2nd Year', '23 Innovation Way, Austin, TX', 'Active'),
('Liam Davis', 'liam.davis@example.com', '+1-555-0103', 'B.Eng Electrical Engineering', 'Electrical Engineering', '4th Year', '78 Edison Circle, Boston, MA', 'Active'),
('Emma Wilson', 'emma.wilson@example.com', '+1-555-0104', 'B.Eng Mechanical Engineering', 'Mechanical Engineering', '1st Year', '45 Industrial Park, Detroit, MI', 'Active'),
('Ethan Brown', 'ethan.brown@example.com', '+1-555-0105', 'B.Sc Civil Engineering', 'Civil Engineering', '3rd Year', '12 Bridge Street, Chicago, IL', 'Active'),
('Olivia Taylor', 'olivia.taylor@example.com', '+1-555-0106', 'B.Sc Computer Science', 'Computer Science', '2nd Year', '89 Silicon Avenue, Seattle, WA', 'Active'),
('Noah Anderson', 'noah.anderson@example.com', '+1-555-0107', 'B.Tech Information Technology', 'Information Technology', '4th Year', '56 Cyber Drive, New York, NY', 'Active'),
('Ava Thomas', 'ava.thomas@example.com', '+1-555-0108', 'B.Sc Data Science', 'Computer Science', '1st Year', '34 Quantum Lane, Denver, CO', 'Active');
