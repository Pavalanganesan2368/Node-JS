const express = require('express');
const fsPromises = require('fs').promises;
const path = require('path');
const app = express();

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get(['/', '/index.html'], async (req, res) => {
  const content = await fsPromises.readFile('index.html', 'utf-8');
  res.send(content);
});

app.get(async (req, res) => {
  const content = await fsPromises.readFile('404-not-found.html', "utf-8");
  res.send(content)
})

app.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000");
});