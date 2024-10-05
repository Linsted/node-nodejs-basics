import path from "path";
import { createHash } from "node:crypto";
import { open } from "node:fs/promises";

const calculateHash = async () => {
  const FILE_NAME = "fileToCalculateHashFor.txt";
  const pathToFile = path.resolve(import.meta.dirname, "files", FILE_NAME);

  try {
    const fd = await open(pathToFile);
    const hash = createHash("sha256");
    const input = fd.createReadStream();

    input.on("readable", () => {
      const data = input.read();
      if (data) {
        hash.update(data);
      } else {
        console.log(`${hash.digest("hex")}`);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

await calculateHash();
