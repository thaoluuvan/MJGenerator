var Jimp = require("jimp");
//
let imgRaw = "import/001.jpg";
let imgLogo = "import/trinhxinhgai.png";
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
    // imageActive.resize()
    return Jimp.read(imgLogo).then(logo => {
      logo.resize(885, 1454);
      var mergeImage = imageActive.composite(logo, 180, 748, [
        Jimp.BLEND_DESTINATION_OVER,
        1,
        1
      ]);
      return mergeImage;
    });
  })
  .then(finalImage => {
    finalImage.quality(100).write(imgExported);
    console.log("Done");
  })
  .catch(error => {
    console.error(error);
  });
