-- view all departments
SELECT *
FROM departments;

-- view all roles and salaries
SELECT roles.id, roles.employee_role, roles.salary, departments.department
FROM roles
JOIN departments ON roles.department_id = departments.id;

-- view employees and their roles, salaries, departments, and managers
SELECT e.id, e.first_name, e.last_name, roles.employee_role, departments.department, roles.salary,
       CONCAT(m.first_name, ' ', m.last_name) AS manager
FROM employees AS e
JOIN roles ON e.role_id = roles.id
JOIN departments ON roles.department_id = departments.id
LEFT JOIN employees AS m ON e.manager_id = m.id;

-- view employee name and roles
SELECT employees.first_name, employees.last_name, roles.employee_role
FROM employees
JOIN roles ON employees.role_id = roles.id
