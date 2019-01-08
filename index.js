const Jimp = require("jimp");
const chalk = require("chalk");
const isImage = require("is-image");
const figlet = require("figlet");
const inquirer = require("inquirer");
//
let imgRaw = "raw/image1.jpg";
let imgLogo = "raw/download.jpg"; // logo
let imgActive = "active/image.jpg";
let imgExported = "GeneratedImages/";
//
const introText = "MJ Generator";
const starting = "Starting....";
const currentFolder = "./";
const fs = require("fs");
//

// init
function init() {
  console.log(
    chalk.green(
      figlet.textSync(introText, {
        horizontalLayout: "default",
        verticalLayout: "default"
      })
    )
  );
  console.log(chalk.red(starting));
}
// merge image
async function mergeImage(fileName, description) {
  return await Jimp.read(imgRaw)
    .then(jimpImage => {
      jimpImage.clone().write(imgActive);
    })
    .then(() => {
      return Jimp.read(imgActive);
    })
    .then(imageActive => {
      return Jimp.read(fileName).then(logo => {
        var mergeImage = imageActive.composite(logo, 0, 0, [
          Jimp.BLEND_DESTINATION_OVER,
          1,
          1
        ]);
        return mergeImage;
      });
    })
    .then(finalImage => {
      finalImage.quality(100).write(imgExported + fileName);
      console.log("Merged image");
    })
    .catch(error => {
      console.error(error);
    });
}
// get image files
async function getImageFiles() {
  var files = fs.readdirSync(currentFolder);
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    if (isImage(file)) {
      var result = await askDescriptionImage(file);
      await mergeImage(currentFolder + file, result.description);
     // console.log(result.description);
    }
  }
}
// ask description for images
async function askDescriptionImage(fileName) {
  return inquirer.prompt([
    {
      name: "description",
      type: "input",
      message: "What's description for " + fileName + "?"
    }
  ]);
}
// run program
async function run() {
  init();
  await getImageFiles();
  console.log("");
  console.log("Done");
}
run();
