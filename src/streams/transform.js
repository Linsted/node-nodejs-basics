import { Transform } from "stream";

function reverseString(text) {
  return text.split("").reverse().join("");
}

const transform = async () => {
  const reverseTransform = new Transform({
    transform(chunk, _, callback) {
      this.push(reverseString(chunk.toString()));

      callback();
    },
  });

  await process.stdin.pipe(reverseTransform).pipe(process.stdout);
};

await transform();
