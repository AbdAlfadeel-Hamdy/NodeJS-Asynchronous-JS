const fs = require("fs");
const superagent = require("superagent");

const readFilePro = (fileName) =>
  new Promise((resolve, reject) => {
    fs.readFile(fileName, (err, data) => {
      if (err) reject("Could not read file!");
      resolve(data);
    });
  });

const writeFilePro = (fileName, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(fileName, data, (err) => {
      if (err) reject("Could not write file!");
      resolve("success");
    });
  });

readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);
    return writeFilePro("dog-img.txt", res.body.message);
  })
  .then(() => {
    console.log("Random dog img saved to a file!");
  })
  .catch((err) => {
    console.log(err);
  });
