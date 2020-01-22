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

// const dump_command = `pg_dump --file "dump_sammy_newDump.sql" --host "46.101.143.191" --port "5432" --username "sammy" --verbose --format=t --blobs "sammy"`;
// const dump_result = child_process.execSync(dump_command);
// console.log(dump_result.toString());

// const restore_command = `pg_restore postgresql://${credentials.user}:${credentials.pass}@${credentials.host}:${credentials.port} -f dump_${credentials.db_name}_1579179573165.sql`;
// const restore_command = `pg_restore -c -U ${credentials.user} -d ${credentials.db_name} -v "./dump_${credentials.db_name}_1579694514966.dump" -W`;
// const restore_command = `PGPASSWORD=${credentials.pass} psql --clean -U ${credentials.user} -p ${credentials.port} -h ${credentials.host} -d ${credentials.db_name} < ./dump_sammy_1579179573165.sql`;
// const restore_command = `pg_restore -h ${credentials.host} -p ${credentials.port} -d ${credentials.db_name} -U ${credentials.user} dump_sammy_1579179573165.sql`;

const restore_command = `pg_restore --host "46.101.143.191" --port "5432" --username "sammy" --password --dbname "sammy" --clean --verbose "/home/codex/Downloads/NodeRepo/sql/dump_sammy_newDump.sql"`;
const restore_result = child_process.execSync(restore_command);
console.log(restore_command);
