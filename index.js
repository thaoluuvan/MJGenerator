var Jimp = require('jimp');
const chalk = require('chalk');
const isImage = require('is-image');

const currentFolder = './';
const fs = require('fs');

fs.readdir(currentFolder, (err, files) => {
  files.forEach(file => {
    if(isImage(file)){
      console.log(file);
    }
  });
})