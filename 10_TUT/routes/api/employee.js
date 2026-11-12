const express = require("express");
const routes = express.Router();
const path = require("path");
const { getAllEmployee, postEmployee, updateEmployee, deleteEmployee, getEmployeeById } = require('../../controllers/employeeController');

routes
  .route("/")
  .get(getAllEmployee)
  .post(postEmployee)
  .put(updateEmployee)
  .delete(deleteEmployee);

routes
  .route("/:id")
  .get(getEmployeeById);

module.exports = routes;
