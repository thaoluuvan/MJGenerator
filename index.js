const Jimp = require("jimp");
const chalk = require("chalk");
const isImage = require("is-image");
const figlet = require("figlet");
const inquirer = require("inquirer");
//
const introText = "MJ Generator";
const currentFolder = "./";
const fs = require("fs");
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
  console.log(chalk.red("Starting...."));
}
// get image files
async function getImageFiles() {
  var files = fs.readdirSync(currentFolder);
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    if (isImage(file) ){
      var description = await askDescriptionImage(file);
    }
  }
}
// ask title for image
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
  console.log("Done");
}
run();
