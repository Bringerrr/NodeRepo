const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const gzip = zlib.createGzip();

const getAllFiles = function(dirPath, fileStore) {
  files = fs.readdirSync(dirPath);
  console.log("dirPath", dirPath);
  fileStore = fileStore || {};

  files.forEach(function(file, index) {
    if (index === 0) {
      const inp = fs.createReadStream(file);
      const out = fs.createWriteStream(file + ".gz");
      console.log("first file", file);

      inp
        .pipe(gzip)
        .on("error", () => {
          // handle error
        })
        .pipe(out)
        .on("error", () => {
          // handle error
        });
    }
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

const unzipFiles = dirPath => {
  zlib.Gunzip(raw_data, function(error, result) {
    if (error) throw error;
    // Access data here through result as a Buffer
  });

  // directoryFiles = fs.readdirSync(dirPath);
  // console.log("directoryFiles", directoryFiles);
  // Promise.all(
  //   directoryFiles.map(filename => {
  //     return new Promise((resolve, reject) => {
  //       const fileContents = fs.createReadStream(`./${filename}`);
  //       const writeStream = fs.createWriteStream(
  //         `./data/new-${filename.slice(0, -3)}`
  //       );
  //       const unzip = zlib.createGunzip();
  //       fileContents
  //         .pipe(unzip)
  //         .pipe(writeStream)
  //         .on("finish", err => {
  //           if (err) return reject(err);
  //           else resolve();
  //         });
  //     });
  //   })
  // ).then(console.log("done"));
};

// Usage
// console.log(getAllFiles("./"));

// unzipFiles("./");

const child_process = require("child_process");
const credentials = {
  host: "46.101.143.191",
  user: "sammy",
  pass: "8588057e",
  port: 5432,
  db_name: "sammy"
};

// const dump_command = `pg_dump postgresql://${credentials.user}:${
//   credentials.pass
// }@${credentials.host}:${credentials.port}/${credentials.db_name} > dump_${
//   credentials.db_name
// }_${Date.now()}.sql`;
// const dump_result = child_process.execSync(dump_command);
// console.log(dump_result.toString());

const restore_command = `pg_restore postgresql://${credentials.user}:${credentials.pass}@${credentials.host}:${credentials.port}/${credentials.db_name} --dbname=sammy < dump_${credentials.db_name}_1579179573165.sql`;
const restore_result = child_process.execSync(restore_command);
console.log(restore_result.toString());
