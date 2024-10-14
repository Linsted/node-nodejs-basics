import { readFile } from "node:fs/promises";
import path from "node:path";

const read = async () => {
  const FILE_TO_READ = "fileToRead.txt";
  const CURRENT_FOLDER = import.meta.dirname;
  const NOT_EXIST_ERROR_CODE = "ENOENT";
  const ERROR_MESSAGE = "FS operation failed";

  const filePath = path.resolve(CURRENT_FOLDER, "files", FILE_TO_READ);

  try {
    const contents = await readFile(filePath, { encoding: "utf8" });
    console.log(contents);
  } catch (error) {
    if (error.code === NOT_EXIST_ERROR_CODE) {
      throw new Error(ERROR_MESSAGE);
    }
    throw error;
  }
};

await read();
