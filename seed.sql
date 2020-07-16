-- seeds for SQL tables
USE tracker;
-- inserting the departments
INSERT INTO departments (name, dept_id)
VALUES ("Sales", 1), 
        ("Finance", 2), 
        ("Engineering", 3), 
        ("Legal", 4), 
        ("Accounting", 5),
        ("HR", 6);
-- inserting the roles
INSERT INTO roles (roles_id, title, dept_id)
VALUES (1, "Sales Lead", 1), 
(2, "Salesperson", 1), 
(3, "Lead Engineer", 3), 
(4, "Software Engineer", 3), 
(5, "Accountant", 5), 
(6, "Lawyer", 4);
        
-- inserting the employees
INSERT INTO employees (first_name, last_name, roles_title, mgr_name, dept, roles_id)
VALUES ("Fiona", "Lamar", "Sales Lead", "Albert A.", "Sales", 1),
("Fred", "Lowe", "Lead Engineer", "Betsy B.", "Engineering", 3),
("Florence", "Leavy", "Software Engineer", "Betsy B.", "Engineering", 4),
("Frank", "Lombardi", "Accountant", "Charles C.", "Accounting", 5),
("Felix", "Lopez", "Lawyer", "Darryl D.", "Legal", 6),
("Francine", "Lockhart", "Lawyer", "Elizabeth E.", "Legal", 6);