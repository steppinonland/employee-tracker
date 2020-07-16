-- seeds for SQL tables
USE tracker;
-- inserting the employees
INSERT INTO employees (first_name, last_name, role_title, mgr_name, dept)
VALUES ("Fiona", "Lamar", "Sales Lead", "Albert A.", "Sales"),
("Fred", "Lowe", "Lead Engineer", "Betsy B.", "Engineering"),
("Florence", "Leavy", "Software Engineer", "Betsy B.", "Engineering"),
("Frank", "Lombardi", "Accountant", "Charles C.", "Accounting"),
("Felix", "Lopez", "Lawyer", "Darryl D.", "Legal"),
("Francine", "Lockhart", "Lawyer", "Elizabeth E.", "Legal");

-- inserting the roles
INSERT INTO roles (title)
VALUES ("Sales Lead"), 
("Salesperson"), 
("Lead Engineer"), 
("Software Engineer"), 
("Accountant"), 
("Lawyer");

-- inserting the departments
INSERT INTO departments (name, dept_id)
VALUES ("Sales", "1"), 
        ("Finance", "2"), 
        ("Engineering", "3"), 
        ("Legal", "4"), 
        ("Accounting", "5"), 
        ("HR", "6")