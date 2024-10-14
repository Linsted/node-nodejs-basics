import { rm } from "node:fs/promises";
import path from "node:path";

const remove = async () => {
  const FILE_TO_REMOVE = "fileToRemove.txt";
  const CURRENT_FOLDER = import.meta.dirname;
  const NOT_EXIST_ERROR_CODE = "ENOENT";
  const ERROR_MESSAGE = "FS operation failed";

  const filePath = path.resolve(CURRENT_FOLDER, "files", FILE_TO_REMOVE);

  try {
    await rm(filePath);
  } catch (error) {
    if (error?.code === NOT_EXIST_ERROR_CODE) {
      throw new Error(ERROR_MESSAGE);
    }
    throw error;
  }
};

await remove();
