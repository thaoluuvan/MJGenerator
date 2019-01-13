#!/usr/bin/env node
const Jimp = require("jimp");
const chalk = require("chalk");
const isImage = require("is-image");
const figlet = require("figlet");
const inquirer = require("inquirer");
const fs = require("fs");
//
const introText = "MJ Generator";
const currentFolder = "./";
const exportFolder = "export/";
const showtop = __dirname + "/import/showtop.jpg";
const showbottom = __dirname + "/import/showbottom.jpg";
const activeImage = "active/image.jpg";
const xCorrdinateTop = 180;
const yCorrdinateTop = 748;
const xCorrdinateBottom = 180;
const yCorrdinateBottom = 0;
const widthTop = 885;
const heightTop = 1454;
const widthBottom = 885;
const heightBottom = 1497;
const maxCharacters = 41;
let textData = {
  text: "Screenshotted by Morejump",
  maxWidth: 1000,
  maxHeight: 100,
  placementX: 100,
  placementY: 200
};
var resizeHeight;

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
  console.log(chalk.yellow("Screenshots Generator by Morejump"));
  console.log(chalk.red("Starting...."));
}
// get image files
async function getImageFiles() {
  var files = fs.readdirSync(currentFolder);
  if (files.length == 0) {
    console.log(chalk.red("No images in current folder!!!"));
    return;
  }

  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    if (isImage(file)) {
      var result = await askDescriptionImage(file);
      try {
        if (result.confirm === true) {
          await mergeImages(file, result.description, result.layout);
        } else {
          i--;
        }
      } catch (error) {
        console.log("Error occurs while merging image, try again!!!");
        i--;
      }
    }
  }
}
// merge images
async function mergeImages(fileName, description, layoutType) {
  if (layoutType === "Show Top") {
    return await mergeImageToTop(fileName, description);
  } else {
    return await mergeImageToBottom(fileName, description);
  }
}

// merge image to top layout
async function mergeImageToTop(fileName, description) {
  return await Jimp.read(currentFolder + fileName)
    .then(importImage => {
      importImage.clone().write(activeImage);
    })
    .then(() => {
      return Jimp.read(activeImage);
    })
    .then(activeImage => {
      console.log(
        "x: " + activeImage.bitmap.width + " y: " + activeImage.bitmap.height
      );
      var croppedImage = activeImage.crop(
        0,
        0,
        activeImage.bitmap.width,
        (activeImage.bitmap.height * 8) / 10
      );
      console.log(
        "x: " + croppedImage.bitmap.width + " y: " + croppedImage.bitmap.height
      );
      return croppedImage;
    })
    .then(croppedImage => {
      croppedImage.resize(widthTop, heightTop);
      return Jimp.read(showtop).then(showtop => {
        var mergedImage = showtop.composite(
          croppedImage,
          xCorrdinateTop,
          yCorrdinateTop,
          [Jimp.BLEND_DESTINATION_OVER, 1, 1]
        );
        return mergedImage;
      });
    }) //load font
    .then(tpl =>
      Jimp.loadFont(Jimp.FONT_SANS_128_BLACK).then(font => [tpl, font])
    )
    .then(data => {
      tpl = data[0];
      font = data[1];

      return tpl.print(
        font,
        textData.placementX,
        textData.placementY,
        {
          text: description,
          alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
          alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
        },
        textData.maxWidth,
        textData.maxHeight
      );
    })
    .then(finalImage => {
      finalImage.quality(100).write(exportFolder + fileName);
      console.log(chalk.red("Generated screenshot!!!"));
    })
    .catch(error => {
      console.error(error);
    });
}
// merge image to bottom layout
async function mergeImageToBottom(fileName, description) {
  return await Jimp.read(currentFolder + fileName)
    .then(importImage => {
      importImage.clone().write(activeImage);
    })
    .then(() => {
      return Jimp.read(activeImage);
    })
    .then(activeImage => {
      console.log(
        "x: " + activeImage.bitmap.width + " y: " + activeImage.bitmap.height
      );
      var croppedImage = activeImage.crop(
        0,
        (activeImage.bitmap.height * 4) / 10,
        activeImage.bitmap.width,
        activeImage.bitmap.height
      );
      console.log(
        "x: " + activeImage.bitmap.width + " y: " + activeImage.bitmap.height
      );
      return croppedImage;
    })
    .then(croppedImage => {
      croppedImage.resize(widthBottom, heightBottom);
      console.log(
        "x: " + croppedImage.bitmap.width + " y: " + croppedImage.bitmap.height
      );
      return Jimp.read(showbottom).then(showbottom => {
        var mergedImage = showbottom.composite(
          croppedImage,
          xCorrdinateBottom,
          yCorrdinateBottom,
          [Jimp.BLEND_DESTINATION_OVER, 1, 1]
        );
        return mergedImage;
      });
    }) //load font
    .then(tpl =>
      Jimp.loadFont(Jimp.FONT_SANS_128_BLACK).then(font => [tpl, font])
    )
    .then(data => {
      tpl = data[0];
      font = data[1];

      return tpl.print(
        font,
        textData.placementX,
        textData.placementY,
        {
          text: description,
          alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
          alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
        },
        textData.maxWidth,
        textData.maxHeight
      );
    })
    .then(finalImage => {
      finalImage.quality(100).write(exportFolder + fileName);
      console.log(chalk.red("Generated screenshot!!!"));
    })
    .catch(error => {
      console.error(error);
    });
}
// ask title for image
async function askDescriptionImage(fileName) {
  return inquirer.prompt([
    {
      name: "description",
      type: "input",
      message:
        "What's description for " +
        chalk.green(fileName) +
        " (max: 41 characters)?",
      validate: description => description.length <= maxCharacters
    },
    {
      name: "layout",
      type: "list",
      message: "Choose desired layout?",
      choices: ["Show Top", "Show Bottom"]
    },
    {
      name: "confirm",
      type: "confirm",
      message: "Are your sure?"
    }
  ]);
}
// run program
async function run() {
  init();
  await getImageFiles();
  console.log(
    chalk.green(
      "Congratulations, You are done. Check " +
        chalk.red("export") +
        " folder, plz!!!"
    )
  );
}

module.exports = { run };
