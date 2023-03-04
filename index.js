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

// readFilePro(`${__dirname}/dog.txt`)
//   .then((data) => {
//     console.log(`Breed: ${data}`);
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     console.log(res.body.message);
//     return writeFilePro("dog-img.txt", res.body.message);
//   })
//   .then(() => {
//     console.log("Random dog img saved to a file!");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);
    const res1Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const imgs = all.map((el) => el.body.message);
    console.log(imgs);
    await writeFilePro("dog-img.txt", imgs.join("\n"));
    console.log("Random dog img saved to a file!");
  } catch (err) {
    console.log(err);
    throw err;
  }
  return "2: ready";
};

(async () => {
  try {
    console.log("1: will get data");
    const x = await getDogPic();
    console.log(x);
    console.log("3: done");
  } catch (err) {
    console.log(err);
  }
})();
