const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const gzip = zlib.createGzip();

var dataBasePath = path.resolve("./dump_sammy_1579179573165.sql");

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
  // zlib.Gunzip(raw_data, function(error, result) {
  //   if (error) throw error;
  //   // Access data here through result as a Buffer
  // });

  directoryFiles = fs.readdirSync(dirPath);
  // console.log("directoryFiles", directoryFiles);
  var gzip = zlib.createGzip();
  var r = fs.createReadStream(directoryFiles[0]);
  var w = fs.createWriteStream("./mygzipfile.gz");
  r.pipe(gzip)
    .pipe(w)
    .on("finish", err => {
      if (err) return reject(err);
      else {
        console.log("successfully finished");
      }
    });

  var r1 = fs.createReadStream(directoryFiles[1]);
  var w1 = fs.createWriteStream("./mygzipfile.gz");
  r1.pipe(gzip)
    .pipe(w)
    .on("finish", err => {
      if (err) return reject(err);
      else {
        console.log("successfully finished 1");
      }
    });
  // Promise.all(
  //   directoryFiles.map(filename => {
  //     if (filename === "node_modules") return null;
  //     return new Promise((resolve, reject) => {
  //       console.log("filename", filename);
  //       const readStream = fs.createReadStream(`./${filename}`);
  //       const writeStream = fs.createWriteStream(`./demo.gz`);
  //       const unzip = zlib.createGunzip();
  //       readStream
  //         .pipe(unzip)
  //         .pipe(writeStream)
  // .on("finish", err => {
  //   if (err) return reject(err);
  //   else resolve();
  // });
  //     });
  //   })
  // )
  //   .then(console.log("done"))
  //   .catch(e => console.log("error", e));
};

// Usage
// console.log(getAllFiles("./"));

unzipFiles("./");

// const child_process = require("child_process");
// const credentials = {
//   host: "46.101.143.191",
//   user: "sammy",
//   pass: "8588057e",
//   port: 5432,
//   db_name: "sammy"
// };

// const dump_command = `pg_dump --file "dump_sammy_newDump.sql" --host "${credentials.host}" --port "${credentials.port}" --username "${credentials.user}" --verbose --format=t --blobs "${credentials.db_name}"`;
// const dump_result = child_process.execSync(dump_command);

// const restore_command = `pg_restore --host "${credentials.host}" --port "${credentials.port}" --username "${credentials.user}" --password --dbname "${credentials.db_name}" --clean --verbose "/home/codex/Downloads/NodeRepo/sql/dump_sammy_newDump.sql"`;
// const restore_result = child_process.execSync(restore_command);
