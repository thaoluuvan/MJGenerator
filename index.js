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

// ask title for image
function askTitleImage(namFile) {
  if (!isImage(file)) return;
  console.log("Title for " + namFile + " image: \n");
  const questions = [
    {
      name: "TITLE",
      type: "input",
      message: "What's title?\n"
    }
  ];
  return inquirer.prompt(questions);
}
// run program
async function run() {
  init();
  console.log("Done");
}
run();
