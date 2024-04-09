const inquirer = require('inquirer');
const mysql = require('mysql2');
const Table = require('cli-table');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sqlbootcamp',
    database: 'business_db'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    }
    console.log('Connected to the database.');

    function runInquirer() {
        inquirer
            .prompt([{
                type: 'list',
                name: 'text',
                message: 'What would you like to do:',
                choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
            }])
            .then((response) => {
                switch (response.text) {
                    case 'view all departments':
                        const sql = `SELECT * FROM departments`;
                        db.query(sql, (err, rows) => {
                            if (err) {
                                console.error('Error querying database: ' + err.stack);
                                return;
                            }
                            // Create a new table
                            const table = new Table({
                                head: ['ID', 'Department'],
                                colWidths: [5, 35]
                            });
                            // Push data into the table
                            rows.forEach(row => {
                                table.push([row.id, row.department]);
                            });
                            // Display the table
                            console.log(table.toString());
                            runInquirer();
                        });
                        break;

                    case 'view all roles':
                        const sql2 = `SELECT roles.id, roles.employee_role, roles.salary, departments.department FROM roles
                        JOIN departments ON roles.department_id = departments.id`;

                        db.query(sql2, (err, rows) => {
                            if (err) {
                                console.error('Error querying database: ' + err.stack);
                                return;
                            }
                            // Create a new table
                            const table = new Table({
                                head: ['ID', 'Title', 'Salary', 'Department'],
                                colWidths: [5, 35, 10, 35]
                            });
                            // Push data into the table
                            rows.forEach(row => {
                                table.push([row.id, row.employee_role, row.salary, row.department]);
                            });
                            // Display the table
                            console.log(table.toString());
                            runInquirer();
                        });
                        break;

                    case 'view all employees':
                        const sql3 = `SELECT e.id, e.first_name, e.last_name, roles.employee_role, departments.department, roles.salary, 
                            CONCAT(m.first_name, ' ', m.last_name) AS manager
                            FROM employees AS e
                            JOIN roles ON e.role_id = roles.id
                            JOIN departments ON roles.department_id = departments.id
                            LEFT JOIN employees AS m ON e.manager_id = m.id`;

                        db.query(sql3, (err, rows) => {
                            if (err) {
                                console.error('Error querying database: ' + err.stack);
                                return;
                            }
                            // Create a new table
                            const table = new Table({
                                head: ['ID', 'First Name', 'Last Name', 'Title', 'Department', 'Salary', 'Manager'],
                                colWidths: [5, 10, 10, 30, 35, 10, 20]
                            });
                            // Push data into the table
                            rows.forEach(row => {
                                // Replace null manager values with an 'null' string
                                if (row.manager === null) {
                                    row.manager = 'null';
                                }

                                table.push([row.id, row.first_name, row.last_name, row.employee_role, row.department, row.salary, row.manager]);
                            });
                            // Display the table
                            console.log(table.toString());
                            runInquirer();
                        });
                        break;

                    case 'add a department':
                        inquirer
                            .prompt([{
                                type: 'input',
                                name: 'text',
                                message: 'Enter a department:',
                            }])
                            .then((response) => {
                                const sql4 = `INSERT INTO departments (department) VALUES ("${response.text}")`;
                                db.query(sql4, (err) => {
                                    if (err) {
                                        console.error('Error adding department: ' + err.stack);
                                        return;
                                    }
                                    // Message 
                                    console.log('Department added to table');
                                    runInquirer();
                                });
                            });
                        break;

                    case 'add a role':
                        // Retrieve departments from the database
                        db.query('SELECT * FROM departments', (err, departments) => {
                            if (err) {
                                console.error('Error retrieving departments: ' + err.stack);
                                return;
                            }

                            // Extract department names from the database result
                            const departmentChoices = departments.map(department => department.department);

                            // Prompt the user for role details
                            inquirer.prompt([
                                {
                                    type: 'input',
                                    name: 'role',
                                    message: 'What is the name of the role:'
                                },
                                {
                                    type: 'input',
                                    name: 'salary',
                                    message: 'What is the salary of the role:'
                                },
                                {
                                    type: 'list',
                                    name: 'department',
                                    message: 'What department does the role belong to:',
                                    choices: departmentChoices
                                }
                            ]).then((response) => {
                                // Find the department id based on the chosen department name
                                const chosenDepartment = departments.find(department => department.department === response.department);
                                const departmentId = chosenDepartment ? chosenDepartment.id : null;

                                if (!departmentId) {
                                    console.error('Error: Invalid department selected');
                                    return;
                                }

                                // Insert the role into the roles table
                                const sql4 = `INSERT INTO roles (employee_role, salary, department_id) VALUES (?, ?, ?)`;
                                const values = [response.role, response.salary, departmentId];
                                db.query(sql4, values, (err) => {
                                    if (err) {
                                        console.error('Error adding role: ' + err.stack);
                                        return;
                                    }
                                    console.log('Role added to table');
                                    runInquirer();
                                });
                            });
                        });
                        break;

                    case 'add an employee':
                        // Retrieve roles from the database
                        db.query('SELECT * FROM roles', (err, roles) => {
                            if (err) {
                                console.error('Error retrieving employees: ' + err.stack);
                                return;
                            }

                            // Extract department names from the database result
                            const roleChoices = roles.map(role => role.employee_role);

                            // Prompt the user for role details
                            inquirer.prompt([
                                {
                                    type: 'input',
                                    name: 'first_name',
                                    message: "What is the employee's first name:"
                                },
                                {
                                    type: 'input',
                                    name: 'last_name',
                                    message: "What is the employee's last name:"
                                },
                                {
                                    type: 'list',
                                    name: 'role',
                                    message: 'Assign a role to the employee:',
                                    choices: roleChoices
                                },
                                {
                                    type: 'list',
                                    name: 'manager',
                                    message: 'Assign a manager to the employee:',
                                    choices: ['Sarah Johnson', 'Daniel Nguyen', 'Rachel Patel', 'Michael Anderson', 'Emily Rodriguez', 'Matthew Harris', 'Christopher White', 'None']
                                }
                            ]).then(async (response) => {
                                // Find the role id based on the chosen role name
                                const chosenRole = roles.find(role => role.employee_role === response.role);
                                const roleId = chosenRole ? chosenRole.id : null;

                              
                                const employees = await new Promise((resolve, reject) => {
                                    db.query('SELECT * FROM employees', (err, employees) => {
                                        if (err) {
                                            console.error('Error retrieving employees: ' + err.stack);
                                            reject(err);
                                        }
                                        resolve(employees);
                                    })
                                })

                                    const chosenManager = employees.find(manager => `${manager.first_name} ${manager.last_name}` === response.manager);
                                    const managerId = chosenManager ? chosenManager.id : null;


                                // const chosenManager = manager.find(manager => manager.employee_role === response.role);
                                // const roleId = chosenRole ? chosenRole.id : null;

                                if (!roleId) {
                                    console.error('Error: Invalid role selected');
                                    return;
                                }
                                const sql4 = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
                                const values = [response.first_name, response.last_name, roleId, managerId];
                                db.query(sql4, values, (err) => {
                                    if (err) {
                                        console.error('Error adding role: ' + err.stack);
                                        return;
                                    }
                                    console.log('Role added to table');
                                    runInquirer();
                                });
                            });

                            // Insert the role into the roles table
                        });
                    break;

                    case 'update an employee role':
                        // retrieve 

                        db.query('SELECT employees.first_name, employees.last_name FROM employees', (err, table) => {
                            if (err) {
                                console.error('Error retrieving employees: ' + err.stack);
                                return;
                            }

                            const employeeChoices = table.map(table => `${table.first_name} ${table.last_name}`);
                            inquirer.prompt([
                
                                {
                                    type: 'list',
                                    name: 'employee',
                                    message: 'Select an employee',
                                    choices: employeeChoices
                                }
                            ]).then((response) => {
                                
                                db.query('SELECT * FROM roles', (err, roles) => {
                                    if (err) {
                                        console.error('Error retrieving employees: ' + err.stack);
                                        return;
                                    }

                                    const roleChoices = roles.map(role => role.employee_role);

                                    inquirer.prompt([
                                        {
                                            type: 'list',
                                            name: 'roles',
                                            message: `Select new role for ${response.employee}`,
                                            choices: roleChoices
                                        }
                                    ])
                                })

                                db.query(`UPDATE employees SET role_id = ? WHERE first_name = ? AND last_name = ?`, [newRoleId, selectedEmployee], (err, result) => {
                                            if (err) {
                                                console.error('Error updating employee role: ' + err.stack);
                                                return;
                                            }
                                            console.log('Employee role updated successfully.');
                                            // Proceed with further actions
                                        })

                            })
                        })
                        
                }
            });
    }
    runInquirer();
});
