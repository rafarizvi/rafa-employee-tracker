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
                }
            });
    }
    runInquirer();
});
