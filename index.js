const mergeImages = require('merge-images');
const { createCanvas, loadImage } = require('canvas')
const canvas = createCanvas(200, 200)

mergeImages(['./mot.png', './hai.jpg'], {
  Canvas: canvas
})
  .then(b64 => console.log('merge successfully'));