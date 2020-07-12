// require the mysql and inquirer modules:
var mysql = require("mysql");
var inquirer = require("inquirer");
// Your port; if not 8080

var PORT = process.env.PORT || 8080;
// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port
  port: PORT,

  // Your username
  user: "root",

  // Your password
  password: "passwordpassword?",
  database: "tracker_DB",
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

// function which prompts the user for what action they should take
function start() {
  inquirer
    .prompt({
      name: "actions",
      type: "list",
      message: "What would you like to do?",
      choices: ["Add Employee", 
      "Add Role", 
      "Add Department",
      "Update Employee Role",
      "Remove Employee", 
      "Remove Role", 
      "View All Employees", 
      "View All Employees by Department", 
      "Exit"],
    })
    .then(function (answer) {
      // based on their answer, call the right question path:
      if (answer.actions === "Add Employee") {
        addEmployee();
      } else if (answer.actions === "Add Role") {
        addRole();
      } else if (answer.actions === "Add Department") {
        addDepartment();
      } else if (answer.actions === "Update Employee Role") {
        updateRole();
      } else if (answer.actions === "Remove Employee") {
        removeEmployee();
      } else if (answer.actionsd === "Remove Role") {
        removeRole();
      } else if (answer.actions === "View All Employees") {
        viewAllEmployees();
      } else if (answer.actions === "View All Employees by Department") {
        viewAllbyDept();
      } else {
        connection.end();
      }
    });
}

// function to handle adding employees
function addEmployee() {
  // prompt for info about the item being put up for auction
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is your new employee's first name?",
      },
      {
        name: "lastName",
        type: "input",
        message: "What is your new employee's last name?",
      },
      {
        name: "role",
        type: "list",
        message: "What is the new employee's role?",
        choices: ["Sales Lead", 
        "Salesperson", 
        "Lead Engineer", 
        "Software Engineer", 
        "Accountant", 
        "Lawyer"]
      },
      {
        name: "dept",
        type: "list",
        message: "What is the new employee's department?",
        choices: ["Sales", 
        "Finance", 
        "Engineering", 
        "Legal", 
        "Accounting", 
        "HR"]
      },
      {
        name: "mgr",
        type: "list",
        message: "Who is the new employee's manager?",
        choices: ["Albert A.", 
        "Betsy B.", 
        "Charles C.", 
        "Darryl D.", 
        "Elizabeth E.", 
        "Fred F."]
      }
    ])
    .then(function (answer) {
      // when finished prompting, insert the new employee into the db with that info
      connection.query(
        "INSERT INTO tracker SET ?",
        {
          employee_name: answer.firstName + answer.lastName,
          role: answer.role,
          department: answer.dept,
          manager: answer.mgr,
        },
        function (err) {
          if (err) throw err;
          console.log("Your employee was created successfully!");
          // re-prompt the user for if they want to bid or post
          start();
        }
      );
    });
}

function updateRole() {
  // query the database for all employees and their roles
  connection.query("SELECT * FROM employee", function (err, employees) {
    if (err) throw err;
    // once you have them, prompt the user for which they'd like to edit
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          employees: function () {
            var employeeArray = [];
            for (var i = 0; i < employees.length; i++) {
              choiceArray.push(employees[i].firstName + employees[i].lastName);
            }
            return employeeArray;
          },
          message: "Which employee needs to update role?"
        },
        {
          name: "newRole",
          type: "list",
          message: "What is this employee's new role?",
          choices: ["Sales Lead", 
          "Salesperson", 
          "Lead Engineer", 
          "Software Engineer", 
          "Accountant", 
          "Lawyer"]
        }
      ])
      .then(function (answer) {
        // get the information of the chosen person
        var chosenEmployee = answer.choice;
        var newRole = answer.newRole;
        connection.query (
          "UPDATE employees SET ? WHERE ?",
          [
            {
              id: chosenEmployee.id,
              role: newRole,
            }
          ],
          function(error) {
            if (error) throw err;
            console.log("Employee's role has been updated.");
            start();
          }
        )
      });
  });
}
