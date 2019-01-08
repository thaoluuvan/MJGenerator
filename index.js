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
async function askTitleImage() {
  return inquirer.prompt([
    {
      name: "name",
      type: "input",
      message: "What's your name?"
    },
    {
      name: "iceCream",
      type: "list",
      message: "Which is your favorite of the following ice cream flavors?",
      choices: ["green tea", "poppyseed jam", "chile", "vanilla"],
      default: 3
    }
  ]);
}
// run program
async function run() {
  init();
  var result = await askTitleImage();
  console.log(result);
  console.log("Done");
}
run();
