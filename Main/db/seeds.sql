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
       ("Supply Chain Manager", 90000, 6),
       ("Marketing Coordinator", 65000, 7),
       ("Manager", 100000, NULL)


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Sarah", "Johnson", 11, NULL),
       ("Rachel", "Patel", 11, NULL),
       ("Michael", "Anderson", 11, NULL),
       ("Daniel", "Nguyen", 11, NULL),
       ("Emily", "Rodriguez", 11, NULL),
       ("Matthew", "Harris", 11, NULL),
       ("Christopher", "White", 11, NULL),
       ("Ethan", "Adams", 1, 1),
       ("Olivia", "Parker", 1, 1),
       ("Malik", "Khan", 4, 2),
       ("Ava", "Patel", 5, 7),
       ("Noah", "Thompson", 6, 3),
       ("Emma", "Garcia", 3, 1),
       ("Lucas", "Smith", 7, 3),
       ("Leila", "Kim", 8, 4),
       ("Juan", "Ramirez", 9, 5),
       ("Sophia", "Brown", 10, 6)




