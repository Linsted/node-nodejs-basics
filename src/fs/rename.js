import { access, rename as renameFile } from "node:fs/promises";
import path from "node:path";

const rename = async () => {
  const INITIAL_FILE_NAME = "wrongFilename.txt";
  const NEW_FILE_NAME = "properFilename.md";
  const FOLDER_NAME = "files";
  const ERROR_MESSAGE = "FS operation failed";
  const NOT_EXIST_ERROR_CODE = "ENOENT";
  const CURRENT_FOLDER = import.meta.dirname;

  const initialFilePath = path.resolve(
    CURRENT_FOLDER,
    FOLDER_NAME,
    INITIAL_FILE_NAME
  );

  const newFilePath = path.resolve(CURRENT_FOLDER, FOLDER_NAME, NEW_FILE_NAME);

  try {
    await access(initialFilePath);

    try {
      await access(newFilePath);
      throw new Error(ERROR_MESSAGE);
    } catch (error) {
      if (error?.code !== NOT_EXIST_ERROR_CODE) {
        throw error;
      }
    }

    await renameFile(initialFilePath, newFilePath);
  } catch (error) {
    throw new Error(ERROR_MESSAGE);
  }
};

await rename();
