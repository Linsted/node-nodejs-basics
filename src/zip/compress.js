import { createGzip } from "node:zlib";
import { pipeline } from "node:stream";
import { promisify } from "node:util";
import { createReadStream, createWriteStream } from "node:fs";
import { unlink } from "node:fs/promises";
import path from "path";

async function doGzip(input, output) {
  const pipe = promisify(pipeline);

  const gzip = createGzip();
  const source = createReadStream(input);
  const destination = createWriteStream(output);
  await pipe(source, gzip, destination);
}

const compress = async () => {
  const FILE_NAME = "fileToCompress.txt";
  const ARCHIVED_FILE_NAME = "archive.gz";
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
    await doGzip(pathToOriginalFile, pathToArchivedFile);
    await unlink(pathToOriginalFile);
  } catch (error) {
    console.log(error);
  }
};

await compress();
