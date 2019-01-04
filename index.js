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
async function listImage() {
  await fs.readdir(currentFolder, async (err, files) => {
    for (const file of files) {
      if (isImage(file)) {
        await askTitleImage(file);
      }
    }
    console.log("Done");
  });
}

// merge images
function mergeImage() {

  
}

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
async function run() {
  init();
}
run();
