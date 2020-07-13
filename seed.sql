-- seeds for SQL tables
USE tracker;
-- inserting the employees
INSERT INTO employees (first_name, last_name)
VALUES ("Fiona", "Lamar"),
("Fred", "Lowe"),
("Florence", "Leavy"),
("Frank", "Lombardi"),
("Felix", "Lopez"),
("Francine", "Lockhart"),

-- inserting the roles

INSERT INTO roles (name)
VALUES ("Sales Lead"), 
        ("Salesperson"), 
        ("Lead Engineer"), 
        ("Software Engineer"), 
        ("Accountant"), 
        ("Lawyer")

-- inserting the departments
INSERT INTO departments (name)
VALUES ("Sales"), 
        ("Finance"), 
        ("Engineering"), 
        ("Legal"), 
        ("Accounting"), 
        ("HR")