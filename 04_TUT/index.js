const http = require("http");
const path = require("path");
const fs = require("fs");
const logEvents = require("./logEvent");
const EventEmitter = require("events");
class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on("log", (msg, fileName) => logEvents(msg, fileName));

const PORT = process.env.PORT || 3500;

const server = http.createServer((req, res) => {
  try {
    const requestPath = req.url === "/" ? "/index.html" : req.url;
    const filePath = path.join(__dirname, "views", requestPath);
    fs.readFile(filePath, (err, data) => {
      const ext = path.extname(filePath);
      const contentType = {
        ".html": "text/html",
        ".css": "text/css",
        ".js": "text/javascript",
      };

      res.writeHead(200, {
        "Content-Type": contentType[ext] || "application/octet-stream",
      });
      myEmitter.emit("log", `${req.url}\t${req.method}`, "requestLog.txt");
      res.end(data);
    });
  } catch (error) {
    res.statusCode = 404;
    res.writeHead(404, { "Content-Type": "text/html" });
    myEmitter.emit("log", `${error.name}\t${error.message}`, "errorLog.txt");
    console.log(error.message);
    res.end();
  }
});

server.listen(PORT, () => console.log(`Server is now running ${PORT}`));
