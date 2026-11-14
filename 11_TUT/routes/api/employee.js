const express = require("express");
const routes = express.Router();
const path = require("path");
const { getAllEmployee, postEmployee, updateEmployee, deleteEmployee, getEmployeeById } = require('../../controllers/employeeController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/VerifyRoles');

routes
  .route("/")
  .get(getAllEmployee)
  .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), postEmployee)
  .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), updateEmployee)
  .delete(verifyRoles(ROLES_LIST.Admin), deleteEmployee);

routes
  .route("/:id")
  .get(getEmployeeById);

module.exports = routes;
