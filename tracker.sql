-- /* Schema for SQL database/table.
DROP DATABASE IF EXISTS tracker;
-- /* Create database */
CREATE DATABASE tracker;
USE tracker;
-- /* Create EMPLOYEES table with a primary key of ID that auto-increments  */
CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL REFERENCES roles(id)
);
-- also the foreign keys of role and manager ID's

-- Create ROLES table with a primary key of ID and foreign key of department_id
CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    dept_id INT NOT NULL REFERENCES departments(id)
);
-- Create DEPARTMENTS table with just a text field with the department names
CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);-- /* Schema for SQL database/table.
DROP DATABASE IF EXISTS tracker;
-- /* Create database */
CREATE DATABASE tracker;
USE tracker;
-- /* Create EMPLOYEES table with a primary key of ID that auto-increments  */
CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL REFERENCES roles(id)
);
-- also the foreign keys of role and manager ID's

-- Create ROLES table with a primary key of ID and foreign key of department_id
CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    dept_id INT NOT NULL REFERENCES departments(id)
);
-- Create DEPARTMENTS table with just a text field with the department names
CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);