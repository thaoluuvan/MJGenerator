var Jimp = require("jimp");

//if you are following along, create the following 2 images relative to this script:
let imgRaw = "raw/image1.jpg"; //a 1024px x 1024px backgroound image
let imgLogo = "raw/trinhxinhgai.png"; //a 155px x 72px logo
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
  })
  .then(imageActive => {
    return Jimp.read(imgLogo).then(logo => {
      var mergeImage = imageActive.composite(logo, 0, 0, [
        Jimp.BLEND_DESTINATION_OVER,
        1,
        1
      ]);
      return mergeImage;
    });
  })
  .then(() => {

    
  })
  .then(finalImage => {
    finalImage.quality(100).write(imgExported);
    console.log("Done");
  })
  .catch(error => {
    console.error(error);
  });
