var Jimp = require("jimp");

let imgRaw = "raw/official.jpg";
let imgLogo = "raw/image1.jpg"; 

let imgActive = "active/image.jpg";
let imgExported = "export/image1.jpg";

//read template & clone raw image
Jimp.read(imgRaw)
  .then(tpl => tpl.clone().write(imgActive))

  //read cloned (active) image
  .then(() => Jimp.read(imgActive))

  //combine logo into image
  .then(tpl =>
    Jimp.read(imgLogo)
      .then(logoTpl => {
        logoTpl.opacity(1).resize(900, 1440);
        return tpl.composite(logoTpl, 166, 755, [
          Jimp.BLEND_DESTINATION_OVER,
          1,
          1
        ]);
      })
      //export image
      .then(tpl => tpl.quality(100).write(imgExported))

      //log exported filename
      .then(tpl => {
        console.log("exported file: " + imgExported);
      })
      //catch errors
      .catch(err => {
        console.error(err);
      })
  );
