var Jimp = require("jimp");

//if you are following along, create the following 2 images relative to this script:
let imgRaw = "raw/image1.jpg"; //a 1024px x 1024px backgroound image
let imgLogo = "raw/logo.png"; //a 155px x 72px logo
//---

let imgActive = "active/image.jpg";
let imgExported = "export/image1.jpg";
//
Jimp.read(imgRaw)
  .then(jimpImage => {
    jimpImage.clone().write(imgActive);
  })
  .then(() => {
    return Jimp.read(imgActive);
  });
