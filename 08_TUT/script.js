const express = require('express');
const employeeRoutes = require('./routes/api/employee');
const app = express ()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/employee", employeeRoutes);

app.listen(5000, () => console.log(`Server is now started: http://localhost:5000`));