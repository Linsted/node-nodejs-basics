import path from "path";
import { release, version } from "os";
import { createServer as createServerHttp } from "http";
import  objectA from "./files/a.json" with { type: "json" };
import  objectB from "./files/b.json" with { type: "json" };
import "./files/c.js";

const random = Math.random();

let unknownObject;

if (random > 0.5) {
  unknownObject = objectA;
} else {
  unknownObject = objectB;
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${import.meta.filename}`);
console.log(`Path to current directory is ${import.meta.dirname}`);

const myServer = createServerHttp((_, res) => {
  res.end("Request accepted");
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log("To terminate it, use Ctrl+C combination");
});

export default {
  unknownObject,
  myServer,
};
