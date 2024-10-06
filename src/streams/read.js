import { open } from "node:fs/promises";
import path from "path";

const read = async () => {
  const FILE_NAME = "fileToRead.txt";

  const pathToFile = path.resolve(import.meta.dirname, "files", FILE_NAME);

  try {
    const fd = await open(pathToFile);
    const readable = fd.createReadStream();

    let allData = "";

    readable.on("data", (chunk) => {
      allData += chunk;
    });
    readable.on("end", () => {
      process.stdout.write(`${allData}\n`);
    });
  } catch (error) {
    console.log(error);
  }
};

await read();
