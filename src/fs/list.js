import { readdir } from "node:fs/promises";
import path from "node:path";

const list = async () => {
  const CURRENT_FOLDER = import.meta.dirname;
  const NOT_EXIST_ERROR_CODE = "ENOENT";
  const ERROR_MESSAGE = "FS operation failed";

  const filePath = path.resolve(CURRENT_FOLDER, "files");

  try {
    const files = await readdir(filePath);
    console.log(files);
  } catch (error) {
    if (error?.code === NOT_EXIST_ERROR_CODE) {
      throw new Error(ERROR_MESSAGE);
    }

    throw error;
  }
};

await list();
