SELECT *
FROM departments;

SELECT roles.id, roles.employee_role, roles.salary, departments.department
FROM roles
JOIN departments ON roles.department_id = departments.id;

SELECT e.id, e.first_name, e.last_name, roles.employee_role, departments.department, roles.salary,
       CONCAT(m.first_name, ' ', m.last_name) AS manager
FROM employees AS e
JOIN roles ON e.role_id = roles.id
JOIN departments ON roles.department_id = departments.id
LEFT JOIN employees AS m ON e.manager_id = m.id;
