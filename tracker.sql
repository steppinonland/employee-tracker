-- /* Schema for SQL database/table.
DROP DATABASE IF EXISTS tracker;
-- /* Create database */
CREATE DATABASE tracker;
USE tracker;

-- Create DEPARTMENTS table with just a text field with the department names
CREATE TABLE departments (
    dept_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

-- Create ROLES table with a primary key of ID and foreign key of department_id
CREATE TABLE roles (
    roles_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    dept_id INT,
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
);

-- /* Create EMPLOYEES table with a primary key of ID that auto-increments  */
CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    mgr_name VARCHAR(30) NOT NULL,
    dept VARCHAR(30) NOT NULL,
    roles_title VARCHAR(30) NOT NULL REFERENCES roles(title),
    roles_id INT NOT NULL,
    FOREIGN KEY (roles_id) REFERENCES roles(roles_id)
);