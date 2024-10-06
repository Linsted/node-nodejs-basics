import { open } from "node:fs/promises";
import path from "path";

const getInput = () => {
  return new Promise((resolve) => {
    process.stdin.on("data", (data) => {
      resolve(data.toString().trim());
    });
  });
};

const write = async () => {
  const FILE_NAME = "fileToWrite.txt";

  const pathToFile = path.resolve(import.meta.dirname, "files", FILE_NAME);

  const inputValue = await getInput();

  let filehandle = null;

  try {
    filehandle = await open(pathToFile, "w");
    await filehandle.writeFile(inputValue);
  } catch (error) {
    console.log(error);
  } finally {
    if (filehandle) {
      await filehandle.close();
    }
    process.exit();
  }
};

await write();
