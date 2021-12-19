const inquirer = require("inquirer")
const cTable = require('console.table');
const db = require('./db/connection');

db.connect(function(err) {
    if (err) throw err
    console.log('Database connected.')
    startPrompt();
});
  
// inital prompt
function startPrompt() {
    inquirer.prompt([
    {
    type: "list",
    message: "What would you like to do?",
    name: "choice",
    choices: [
              "View all departments",
              "View all roles", 
              "View all employees",
              "Add a department",
              "Add a role",
              "Add an employee",
              "Update an employee's role"              
            ]
    }
]).then(function(val) {
        switch (val.choice) {
            case "View all departments":
              viewAllDepartments();
            break;
    
          case "View all roles":
              viewAllRoles();
            break;
          case "View all employees":
              viewAllEmployees();
            break;
          
          case "Add a department":
                addDepartment();
              break;

          case "Add a role":
                addRole();
              break;
      
            case "Add an employee":
                addEmployee();
              break;
      
            case "Update an employee's role" :
                updateEmployee();
              break;
    
            }
    })
}
// View All Departments//
function viewAllDepartments() {
    db.query("SELECT department.id, department.name FROM department;", 
    function(err, res) {
      if (err) throw err
      console.table(res)
      startPrompt()
  }
)
}
//View All Roles//
function viewAllRoles() {
  db.query("SELECT role.id, role.title, role.salary, department.name AS name FROM role JOIN department on role.department_id = department.id;", 
  function(err, res) {
  if (err) throw err
  console.table(res)
  startPrompt()
  })
}
//View All Employees //
function viewAllEmployees() {
  db.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;", 
  function(err, res) {
    if (err) throw err
    console.table(res)
    startPrompt()
  })
}

//Role Quieries Role Title //
var roleArr = [];
function selectRole() {
  db.query("SELECT * FROM role", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      roleArr.push(res[i].title);
    }

  })
  return roleArr;
}
//Role Quieries The Managers//
var managersArr = [];
function selectManager() {
  db.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      managersArr.push(res[i].first_name);
    }

  })
  return managersArr;
}


//Add Department//
function addDepartment() { 

    inquirer.prompt([
        {
          name: "name",
          type: "input",
          message: "What Department would you like to add?"
        }
    ]).then(function(res) {
        var query = db.query(
            "INSERT INTO department SET ? ",
            {
              name: res.name
            
            },
            function(err) {
                if (err) throw err
                console.table(res);
                startPrompt();
            }
        )
    })
  }

  //Add Employee Role//
function addRole() { 
    db.query("SELECT role.title AS Title, role.salary AS Salary FROM role",   function(err, res) {
      inquirer.prompt([
          {
            name: "Title",
            type: "input",
            message: "What is the roles Title?"
          },
          {
            name: "Salary",
            type: "input",
            message: "What is the Salary?"
  
          } 
      ]).then(function(res) {
          db.query(
              "INSERT INTO role SET ?",
              {
                title: res.Title,
                salary: res.Salary,
              },
              function(err) {
                  if (err) throw err
                  console.table(res);
                  startPrompt();
              }
          )
  
      });
    });
    }
    //Add Employee//
function addEmployee() { 
    inquirer.prompt([
        {
          name: "firstname",
          type: "input",
          message: "Enter their first name "
        },
        {
          name: "lastname",
          type: "input",
          message: "Enter their last name "
        },
        {
          name: "role",
          type: "list",
          message: "What is their role? ",
          choices: selectRole()
        },
        {
            name: "choice",
            type: "rawlist",
            message: "Whats their managers name?",
            choices: selectManager()
        }
    ]).then(function (val) {
      var roleId = selectRole().indexOf(val.role) + 1
      var managerId = selectManager().indexOf(val.choice) + 1
        db.query("INSERT INTO employee SET ?", 
      {
          first_name: val.firstname,
          last_name: val.lastname,
          manager_id: managerId,
          role_id: roleId
          
      }, function(err){
          if (err) throw err
          console.table(val)
          startPrompt()
      })

  })
}

//Update Employee//
function updateEmployee() {
    db.query("SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;", function(err, res) {
     if (err) throw err
    inquirer.prompt([
          {
            name: "lastname",
            type: "rawlist",
            choices: function() {
              var lastName = [];
              for (var i = 0; i < res.length; i++) {
                lastName.push(res[i].last_name);
              }
              return lastName;
            },
            message: "What is the Employee's last name? ",
          },
          {
            name: "role",
            type: "rawlist",
            message: "What is the Employees new role? ",
            choices: selectRole()
          },
      ]).then(function(val) {
        var roleId = selectRole().indexOf(val.role) + 1
        db.query("UPDATE employee SET WHERE ?", 
        {
          last_name: val.lastName
        }, 
        {
          role_id: roleId
        }, 
        function(err){
            if (err) throw err
            console.table(val)
            startPrompt()
        })
  
    });
  });

  }