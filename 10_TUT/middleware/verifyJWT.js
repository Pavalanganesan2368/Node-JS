const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);

  const token = authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);
  
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (error, decoded) => {
      console.log(decoded);
      if (error || !decoded?.username) return res.sendStatus(403); // Invalid Token
      req.user = decoded.username;

      next();
    }
  )
}

module.exports = verifyJWT;