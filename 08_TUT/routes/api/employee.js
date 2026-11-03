const express = require("express");
const routes = express.Router();
const path = require("path");
const { getAllEmployees, postEmployee, updateEmployee, deleteEmployee, getEmployeeById } = require('../../controllers/employeeController');

routes
  .route("/")
  .get(getAllEmployees)
  .post(postEmployee)
  .put(updateEmployee)
  .delete(deleteEmployee);

routes
  .route("/:id")
  .get(getEmployeeById);

module.exports = routes;
