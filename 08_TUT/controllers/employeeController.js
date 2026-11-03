const data = {
  employees: require("../model/employee.json"),
  setEmployees: function (data) { this.employees = data }
}

const { v4: uuid } = require("uuid");

const getAllEmployees = (req, res) => {
  if (data.employees.length === 0)
    return res.status(404).json({ message: "Employee Data not found" });
  res.status(200).json(data.employees);
};

const postEmployee = (req, res) => {
  const { firstname, lastname } = req.body;
  
  const newEmployee = {
    id: uuid(),
    firstname,
    lastname
  }

  if (!firstname || !lastname) return res.status(400).json({ message: "First name and Last name not present. Please enter first" });

  data.setEmployees([...data.employees, newEmployee]);
  res.status(201).json(data.employees);
};

const updateEmployee = (req, res) => {
  if (data.employees.length === 0) return res.status(404).json({ message: "Employee Data is not found to update" });
  const employee = data.employees.find((emp) => emp.id === req.body.id);
  if (!employee) {
    return res.status(400).json({ message: `Employee ID ${req.body.id} not found` });
  }

  if (req.body.firstname) employee.firstname = req.body.firstname
  if (req.body.lastname) employee.lastname = req.body.lastname

  const filteredArray = data.employees.filter((emp) => emp.id !== req.body.id);
  const unsortedArray = [...filteredArray, employee];

  data.setEmployees(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
  res.json(data.employees);
};

const deleteEmployee = (req, res) => {
  const employee = data.employees.find((emp) => emp.id === req.body.id);
  if (!employee) return res.status(400).json({ message: `Employee ID ${req.body.id} is not found` });

  const filteredArray = data.employees.filter((emp) => emp.id !== req.body.id);
  data.setEmployees([...filteredArray]);
  res.status(200).json(data.employees);
};

const getEmployeeById = (req, res) => {
  const employee = data.employees.find(emp => emp.id === req.params.id);
  if (!employee) return res.status(404).json({ message: `Employee ID ${req.body.id} is not found` });
  return res.status(200).json(employee);
};

module.exports = {
  getAllEmployees,
  postEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeById,
};
