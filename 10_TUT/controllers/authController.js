const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const fsPromises = require('fs').promises;
const path = require('path');

const userDB = {
  users: require('../model/users.json'),
  setUsers: function (data) {
    this.users = data
  }
}

dotenv.config();

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: "Please enter the username and password." });

  const foundUser = userDB.users.find(person => person.username === username);
  if (!foundUser) return res.sendStatus(401); //unauthorized

  const pwdHashed = await bcrypt.compare(password, foundUser.password);
  if (pwdHashed) {
    //create JWT
    const accessToken = jwt.sign(
      { "username": foundUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '5m' } // Should change the real time to 5 minutes to 10 minutes during production.
    );

    const refreshToken = jwt.sign(
      { "username": foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' } // Should change the real time to 5 minutes to 10 minutes during production.
    );

    //Saving refresh Token with current user
    const otherUsers = userDB.users.filter(person => person.username !== foundUser.username);
    const currentUser = { ...foundUser, refreshToken }

    userDB.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(userDB.users)
    );

    res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
}

module.exports = { 
  handleLogin
}