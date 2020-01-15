const fs = require("fs");
const path = require("path");

const getAllFiles = function(dirPath, fileStore) {
  files = fs.readdirSync(dirPath);
  console.log("dirPath", dirPath);
  fileStore = fileStore || {};

  files.forEach(function(file) {
    if (
      fs.statSync(dirPath + "/" + file).isDirectory() &&
      dirPath !== ".//node_modules"
    ) {
    } else if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      fileStore = getAllFiles(dirPath + "/" + file, fileStore);
    } else {
      fileStore[path.join(__dirname, dirPath, "/", file)] = "info";
    }
  });

  return fileStore;
};

// Usage
console.log(getAllFiles("./"));
