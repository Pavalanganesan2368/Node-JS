const userDB = {
  users: require('../model/users.json'),
  setUsers: function (data) {
    this.users = data
  }
}

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: "User not provide the username or password." });

  //check the duplicate the username in the database

  const duplicate = userDB.users.find(person => person.username === username);
  if (duplicate) return res.sendStatus(409); //Conflict
  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(password, 10);
    // store the new user
    const newUser = {
      "username": username,
      "roles": { 'User': 2001 },
      "password": hashedPwd
    }

    userDB.setUsers([...userDB.users, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(userDB.users)
    )

    console.log(userDB.users);
    res.status(201).json({ success: `New User ${username} Created!` })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  handleNewUser
};