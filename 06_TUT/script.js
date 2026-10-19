const express = require('express');
const path = require('path');
const app = express ();

const PORT = process.env.PORT || 3500;

const one = (req, res, next) => {
  console.log("One is Started");
  next();
}

const two = (req, res, next) => {
  console.log("Two is Started");
  next();
}
const three = (req, res, next) => {
  console.log("Three is Finished")
  res.send("Finished");
}

app.use('/chain', [one, two, three]);

app.use(['/', '/index', '/index.html'], (req, res) => {
  res.send("Hello World!");
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, '404.html'));
})

app.listen(PORT, () => console.log(`Server is now running at http://localhost:${PORT}`));