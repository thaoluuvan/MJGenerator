var Jimp = require("jimp");

let imgRaw = "raw/official.jpg";
let imgLogo = "raw/ngotrinhback.jpg";

let imgActive = "active/image.jpg";
let imgExported = "export/image1.jpg";

var textData = {
  text: "© JKRB Investments Limited", //the text to be rendered on the image
  maxWidth: 1004, //image width - 10px margin left - 10px margin right
  maxHeight: 72 + 20, //logo height + margin
  placementX: 10, // 10px in on the x axis
  placementY: 1024 - (72 + 20) - 10 //bottom of the image: height - maxHeight - margin
};

var run = async () => {
  //read template & clone raw image
  var tpl = await Jimp.read(imgRaw);
  await tpl.clone().write(imgActive);
  await Jimp.read(imgActive);
  var logoTpl = await Jimp.read(imgLogo);
  logoTpl.opacity(1);
  await tpl.composite(logoTpl, 512 - 75, 512, [
    Jimp.BLEND_DESTINATION_OVER,
    0.2,
    0.2
  ]);
  await tpl.quality(100).write(imgExported);
  console.log("exported file: " + imgExported);
};
run();
