import { access, cp } from "node:fs/promises";
import path from "node:path";

const copy = async () => {
  const ERROR_MESSAGE = "FS operation failed";
  const NOT_EXIST_ERROR_CODE = "ENOENT";
  const ORIGINAL_FOLDER = "files";
  const COPY_FOLDER = "files_copy";

  const filesFolderPath = path.resolve(import.meta.dirname, ORIGINAL_FOLDER);
  const filesCopyFolderPath = path.resolve(import.meta.dirname, COPY_FOLDER);

  try {
    await access(filesFolderPath);

    try {
      await access(filesCopyFolderPath);
      throw new Error(ERROR_MESSAGE);
    } catch (error) {
      if (error?.code !== NOT_EXIST_ERROR_CODE) {
        throw new Error(ERROR_MESSAGE);
      }
    }

    await cp(filesFolderPath, filesCopyFolderPath, { recursive: true });
  } catch (error) {
    throw new Error(ERROR_MESSAGE);
  }
};

await copy();
