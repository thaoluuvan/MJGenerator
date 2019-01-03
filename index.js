const Jimp = require('jimp');
const program = require('commander');
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
      .quality(100) // set JPEG quality
      .greyscale() // set greyscale
      .write(nameImage); // save
  });
}
function mergeImage(){
  program
  .option('--no-sauce', 'Remove sauce')
  .parse(process.argv);

console.log('you ordered a pizza');
if (program.sauce) console.log('  with sauce');
else console.log(' without sauce');
}
//listImage();
mergeImage();