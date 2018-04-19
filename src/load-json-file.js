const path = require("path");
const fs = require("fs");

function loadJsonFile(targetPath, fileName) {
  try {
    const existingJsonFilePath = path.join(process.cwd(), targetPath, fileName);
    if (fs.existsSync(existingJsonFilePath)) {
      console.log("Loading: ", existingJsonFilePath);
      return require(existingJsonFilePath);
    }
    return {};
  } catch (e) {
    console.log(`Failed to load ${fileName}, exiting`);
    process.exit(1);
  }
}

module.exports = loadJsonFile;
