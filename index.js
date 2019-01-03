var Jimp = require('jimp');
const chalk = require('chalk');
 
console.log(chalk.blue.bold('Develope by Morejump!!!'));

//if you are following along, create the following 2 images relative to this script:
var imgRaw = 'raw/image1.jpg'; //a 1024px x 1024px backgroound image
var imgLogo = 'raw/ngoctrinh_icon.jpg'; //a 155px x 72px logo
//---

var imgActive = 'active/image.jpg';
var imgExported = 'export/image1.jpg';

//read template & clone raw image 
Jimp.read(imgRaw)
  .then(tpl => (tpl.clone().write(imgActive)))

  //read cloned (active) image
  .then(() => (Jimp.read(imgActive)))

  //combine logo into image
  .then(tpl => (
    Jimp.read(imgLogo).then(logoTpl => {
      logoTpl.opacity(1);
      return tpl.composite(logoTpl, 0, 0, [Jimp.BLEND_DESTINATION_OVER, 1, 1]);
    })
  ))
  //export image
  .then(tpl => (tpl.quality(100).write(imgExported)))
  //log exported filename
  .then(tpl => { 
    console.log('exported file: ' + imgExported);
  })
  //catch errors
  .catch(err => {
    console.error(err);
  });