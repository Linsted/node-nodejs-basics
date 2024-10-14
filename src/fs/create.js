import { writeFile, access } from "node:fs/promises";
import path from "node:path";

const create = async () => {
  const FILE_NAME = "fresh.txt";
  const ERROR_MESSAGE = "FS operation failed";
  const FILE_MESSAGE = "I am fresh and young";
  const NOT_EXIST_ERROR_CODE = "ENOENT";

  const filePath = path.resolve(import.meta.dirname, "files", FILE_NAME);

  try {
    await access(filePath);
    throw new Error(ERROR_MESSAGE);
  } catch (error) {
    if (error.code === NOT_EXIST_ERROR_CODE) {
      await writeFile(filePath, FILE_MESSAGE);
    } else {
      throw new Error(ERROR_MESSAGE);
    }
  }
};

await create();
