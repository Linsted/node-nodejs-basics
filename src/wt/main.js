import { Worker } from "worker_threads";
import path from "path";
import os from "os";

const performCalculations = async () => {
  const FILE_NAME = "./workers.js";

  const coresQuantity = os.cpus().length;
  const numbers = [];
  let completedWorkers = 0;
  const workerPath = path.resolve(import.meta.dirname, FILE_NAME);

  for (let i = 0; i < coresQuantity; i++) {
    const worker = new Worker(workerPath);
    let numberToSend = 10 + i;
    worker.postMessage(numberToSend);

    worker.on("message", (result) => {
      numbers[i] = { status: "resolved", data: result };
      completedWorkers++;

      if (completedWorkers === coresQuantity) {
        console.log(numbers);
        process.exit();
      }
    });

    worker.on("error", (err) => {
      numbers[i] = { status: "error", data: null };
      completedWorkers++;

      if (completedWorkers === coresQuantity) {
        console.log(numbers);
        console.log(err);
        process.exit();
      }
    });

    worker.on("exit", (code) => {
      if (code !== 0) {
        console.error(`Exit code ${code}`);
      }
    });
  }
};

await performCalculations();
