const Jimp = require("jimp");
const program = require("commander");
const chalk = require("chalk");
const isImage = require("is-image");
const figlet = require("figlet");
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
}

// list image in current folder
function listImage() {
  fs.readdir(currentFolder, (err, files) => {
    files.forEach(file => {
      if (isImage(file)) {
        convertToGrey(file);
      }
    });
  });
}
// convert images to grey images
function convertToGrey(nameImage) {
  Jimp.read(nameImage, (err, iamge) => {
    if (err) throw err;
    iamge
      .quality(100) // set JPEG quality
      .greyscale() // set greyscale
      .write(nameImage); // save
  });
}
// merge images
function mergeImage() {}
// insert text to image
function insetTextToImage(text)
{
}
// ask title for image
function askTitleImage(){

}
const run = async () => {
  init();
  askTitleImage();
  console.log(chalk.red('Generated screenshots successfully!!!'));
};
run();
