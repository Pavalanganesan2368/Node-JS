import fs from "fs";
// import { v4 as uuidv4 } from "uuid";
import path, { dirname } from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fileStream = () => {
  if (!fs.exists(path.join(__dirname, "newDir"))) {
    fs.mkdir(path.join(__dirname, "newDir"));
  }
};

export default fileStream;
