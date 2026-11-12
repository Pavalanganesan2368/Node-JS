const fsPromises = require('fs').promises;
const path = require('path');

const data = {
  employee: require("../model/employee.json"),
  setemployee: function (data) { this.employee = data } 
}

const { v4: uuid } = require("uuid");

const getAllEmployee = (req, res) => {
  if (data.employee.length === 0) {
    return res.status(404).json({ message: "Employee Data not found" });
  }
  return res.status(200).json(data.employee);
};

const postEmployee = async (req, res) => {
  
  const newEmployee = {
    id: uuid(),
    firstname: req.body.firstname,
    lastname: req.body.lastname
  }

  if (!req.body.firstname || !req.body.lastname) return res.status(400).json({ message: "First name and Last name not present. Please enter first" });

  data.setemployee([...data.employee, newEmployee]);

  await fsPromises.writeFile(
    path.join(__dirname, "..", "model", "employee.json"),
    JSON.stringify(data.employee)
  )
  res.status(201).json(newEmployee);
};

const updateEmployee = (req, res) => {
  if (data.employee.length === 0) return res.status(404).json({ message: "Employee Data is not found to update" });
  const employee = data.employee.find((emp) => emp.id === req.body.id);
  if (!employee) {
    return res.status(400).json({ message: `Employee ID ${req.body.id} not found` });
  }

  if (req.body.firstname) employee.firstname = req.body.firstname
  if (req.body.lastname) employee.lastname = req.body.lastname

  const filteredArray = data.employee.filter((emp) => emp.id !== req.body.id);
  const unsortedArray = [...filteredArray, employee];

  data.setemployee(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
  res.json(data.employee);
};

const deleteEmployee = (req, res) => {
  const employee = data.employee.find((emp) => emp.id === req.body.id);
  if (!employee) return res.status(400).json({ message: `Employee ID ${req.body.id} is not found` });

  const filteredArray = data.employee.filter((emp) => emp.id !== req.body.id);
  data.setemployee([...filteredArray]);
  res.status(200).json(data.employee);
};

const getEmployeeById = (req, res) => {
  const employee = data.employee.find(emp => emp.id === req.params.id);
  if (!employee) return res.status(404).json({ message: `Employee ID ${req.body.id} is not found` });
  return res.status(200).json(employee);
};

module.exports = {
  getAllEmployee,
  postEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeById,
};
