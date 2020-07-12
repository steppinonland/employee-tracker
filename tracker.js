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
        addDept();
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
  connection.query("SELECT * FROM employees", function (err, employees) {
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
        // get the information of the chosen person and update their role
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
function addRole() {
  // prompt the user for what they want to add
    inquirer
      .prompt([
        {
          name: newRole,
          type: input,
          message: "What is the title of the new role?"
        }
      ])
      .then(function (answer) {
        // update the role table in SQL
        var newRole = answer.newRole;
        connection.query (
          "INSERT INTO roles SET ? WHERE ?",
          [
            {
              title: newRole,
            }
          ],
          function(error) {
            if (error) throw err;
            console.log("New type of role has been added sucessfully.");
            start();
          }
        )
      });
}
function addDept() {
  // prompt the user for what department they're adding
    inquirer
      .prompt([
        {
          name: newDept,
          type: input,
          message: "What is the title of the new department?"
        }
      ])
      .then(function (answer) {
        // get the information of the chosen person and update their role
        var newDept = answer.newDept;
        connection.query (
          "INSERT INTO departments SET ?",
          [
            {
              name: newDept,
            }
          ],
          function(error) {
            if (error) throw err;
            console.log("New department has been added sucessfully.");
            start();
          }
        )
      });
}
function removeEmployee() {
  connection.query("SELECT * FROM employees", function (err, employees) {
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
          message: "Which employee would you like to remove?"
        }
      ])
      .then(function (answer) {
        // get the information of the chosen person and remove them
        var chosenEmployee = answer.choice;
        connection.query (
          "DELETE employees SET ? WHERE ?",
          [
            {
              id: chosenEmployee.id
            }
          ],
          function(error) {
            if (error) throw err;
            console.log("Employee has been removed successfully.");
            start();
          }
        )
      });
  });
}
function removeEmployee() {
  connection.query("SELECT * FROM roles", function (err, roles) {
    if (err) throw err;
    // once you have them, prompt the user for which they'd like to edit
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function () {
            var rolesArray = [];
            for (var i = 0; i < roles.length; i++) {
              rolesArray.push(roles[i].title);
            }
            return rolesArray;
          },
          message: "Which role would you like to remove?"
        }
      ])
      .then(function (answer) {
        // get the information of the chosen person and remove them
        var chosenRole = answer.choice;
        connection.query (
          "DELETE roles SET ? WHERE ?",
          [
            {
              id: chosenRole.title
            }
          ],
          function(error) {
            if (error) throw err;
            console.log("Role has been removed successfully.");
            start();
          }
        )
      });
  });
}
function viewAllEmployees() {
  connection.query("SELECT name FROM employees", function(err, res) {
    if (err) throw err;

    // Log all results of the SELECT statement
    console.log(res);
    start();
  });
}
function viewAllbyDept() {
  console.log("All employees by department...\n")
  var query = "SELECT employees FROM departments"
  connection.query(query, function (err, res) {
    if (err) throw err;

    // log the employees by their department
    console.log(res);
    start();
  });
}
