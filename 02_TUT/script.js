import { dirname } from "path";
import { fileURLToPath } from "url";
import fileStream from "./stream.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fileSystem = async () => {
  try {
    fileStream();
  } catch (error) {
    console.error(error);
  }
};

fileSystem();
