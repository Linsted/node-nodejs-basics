const parseArgs = () => {
  const argumentsArray = process.argv.splice(2, process.argv.length - 1);
  const argumentsForLogging = [];

  argumentsArray.forEach((element, index) => {
    if (index % 2 === 0) {
      argumentsForLogging.push(
        `${element.slice(2)} is ${argumentsArray[index + 1]}${
          index === argumentsArray.length - 2 ? "" : ","
        }`
      );
    }
  });

  console.log(argumentsForLogging.join(" "));
};

parseArgs();
