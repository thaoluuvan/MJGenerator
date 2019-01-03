var Jimp = require('jimp');
const chalk = require('chalk');
const isImage = require('is-image');

const currentFolder = './';
const fs = require('fs');

function listImage(){
  fs.readdir(currentFolder, (err, files) => {
    files.forEach(file => {
      if(isImage(file)){
        convertToGrey(file);
      }
    });
  })
};
function convertToGrey(nameImage){
  Jimp.read(nameImage, (err, iamge) => {
    if (err) throw err;
    iamge
      //.resize(500, 500) // resize
      .quality(100) // set JPEG quality
      .greyscale() // set greyscale
      .write(nameImage); // save
  });
}
listImage();