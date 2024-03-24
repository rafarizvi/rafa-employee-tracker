INSERT INTO departments (department)
VALUES ("Research & Development"),
       ("Quality Assurance"),
       ("Production"),
       ("Environmental Health & Safety"),
       ("Regulatory Affairs"),
       ("Operations"),
       ("Marketing")

INSERT INTO roles (employee_role, salary, department_id)
VALUES ("Research Chemist", 75000, 1),
       ("Chemical Engineer", 85000, 1), 
       ("Analytical Chemist", 65000, 1),        
       ("Quality Control Specialist", 60000, 2),       
       ("EHS Officer", 70000, 4),       
       ("Production Supervisor", 75000, 3),
       ("Process Technician", 55000, 3),
       ("Regulatory Affairs Specialist", 75000, 5),
       ("Supply Chain Analyst", 90000, 6),
       ("Marketing Coordinator", 65000, 7),
       ("Manager", 100000, 1),
       ("Manager", 100000, 2),
       ("Manager", 100000, 3),
       ("Manager", 100000, 4),
       ("Manager", 100000, 5),
       ("Manager", 100000, 6),
       ("Manager", 100000, 7)


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Sarah", "Johnson", 11, NULL),
       ("Ethan", "Adams", 1, 1),
       ("Olivia", "Parker", 1, 1),
       ("Emma", "Garcia", 3, 1),
       ("Daniel", "Nguyen", 15, NULL),
       ("Leila", "Kim", 8, 4),
       ("Rachel", "Patel", 12, NULL),
       ("Malik", "Khan", 4, 2),
       ("Michael", "Anderson", 13, NULL),
       ("Noah", "Thompson", 6, 3),
       ("Lucas", "Smith", 7, 3),
       ("Emily", "Rodriguez", 16, NULL),
       ("Juan", "Ramirez", 9, 5),
       ("Matthew", "Harris", 17, NULL),
       ("Sophia", "Brown", 10, 6),
       ("Christopher", "White", 14, NULL),
       ("Ava", "Patel", 5, 7)




