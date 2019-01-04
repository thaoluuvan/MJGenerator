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

// list image in current folder
function listImage() {
  fs.readdir(currentFolder, (err, files) => {
    files.forEach(file => {
      if (isImage(file)) {
      askTitleImage(file);
      }
    });
  });
}

// merge images
function mergeImage() {}

// insert text to image
function insetTextToImage(text) {}

// ask title for image
function askTitleImage(namFile) {
  console.log("Title for " + namFile + " image:");
  const questions = [
    {
      name: "TITLE",
      type: "input",
      message: "What's title?"
    }
  ];
  return inquirer.prompt(questions);
}
// run program
const run = async () => {
  init();
  //const title = await askTitleImage();
  await listImage();
  console.log(chalk.red("Generated screenshots successfully!!!"));
};
run();
