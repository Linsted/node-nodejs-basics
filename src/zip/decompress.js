import { createUnzip } from "node:zlib";
import { pipeline } from "node:stream";
import { promisify } from "node:util";
import { createReadStream, createWriteStream } from "node:fs";
import path from "path";

async function unZip(input, output) {
  const pipe = promisify(pipeline);

  const unZip = createUnzip();
  const source = createReadStream(input);
  const destination = createWriteStream(output);
  await pipe(source, unZip, destination);
}

const decompress = async () => {
  const ARCHIVED_FILE_NAME = "archive.gz";
  const FILE_NAME = "fileToCompress.txt";
  const FILES_FOLDER_NAME = "files";

  const pathToOriginalFile = path.resolve(
    import.meta.dirname,
    FILES_FOLDER_NAME,
    FILE_NAME
  );
  const pathToArchivedFile = path.resolve(
    import.meta.dirname,
    FILES_FOLDER_NAME,
    ARCHIVED_FILE_NAME
  );

  try {
    await unZip(pathToArchivedFile, pathToOriginalFile);
  } catch (error) {
    console.log(error);
  }
};

await decompress();
