const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const fsPromises = require("fs").promises;
const path = require("path");
const fs = require("fs");

const logEvent = async (message) => {
  const dateTime = `${format(new Date(), "yyyy-MM-dd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "logs", "eventLog.txt"),
      logItem,
    );
  } catch (error) {
    console.error(error);
  }
};

module.exports = logEvent;
