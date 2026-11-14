const express = require('express');
const employeeRoutes = require('./routes/api/employee');
const registerRoutes = require('./routes/register');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const refreshRoutes = require('./routes/refresh');
const logoutRoutes = require('./routes/logout');
const app = express()

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/employee", employeeRoutes);
app.use("/register", registerRoutes);
app.use("/auth", authRoutes);
app.use("/refresh", refreshRoutes);
app.use("/logout", logoutRoutes);
app.use(verifyJWT);

app.listen(5000, () => console.log(`Server is now started: http://localhost:5000`));