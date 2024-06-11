let img;
let imgOriginal;

function preload() {
  img = loadImage("Flower.jpeg");
}

function setup() {
  let canvas = createCanvas(900, 1400);
  canvas.id("myCanvas");
  imgOriginal = img.get();
  noLoop();
}

function draw() {
  background(220);

  let padding = 20;
  let imgWidth = (width - 3 * padding) / 2;
  let imgHeight = (height - 5 * padding) / 4;

  image(imgOriginal, padding, padding, imgWidth, imgHeight);

  displayPixelData(padding + imgWidth + padding, padding, imgWidth, imgHeight);
  applyPointillism(padding, padding + imgHeight + padding, imgWidth, imgHeight);
  applyPosterize(
    padding + imgWidth + padding,
    padding + imgHeight + padding,
    imgWidth,
    imgHeight
  );
  clipAndMask(
    padding,
    padding + 2 * (imgHeight + padding),
    imgWidth,
    imgHeight
  );
  clipWithText(
    padding + imgWidth + padding,
    padding + 2 * (imgHeight + padding),
    imgWidth,
    imgHeight
  );
}

function displayPixelData(x, y, w, h) {
  let imgCopy = imgOriginal.get();
  imgCopy.loadPixels();
  let d = pixelDensity();
  let halfImage = (4 * (imgCopy.width * d) * (imgCopy.height * d)) / 2;
  for (let i = 0; i < halfImage; i += 4) {
    imgCopy.pixels[i] = 0; // set red to 0
  }
  imgCopy.updatePixels();
  image(imgCopy, x, y, w, h);
}

function applyPointillism(x, y, w, h) {
  let imgCopy = imgOriginal.get();
  let pointillism = 10;
  for (let i = 0; i < imgCopy.width; i += pointillism) {
    for (let j = 0; j < imgCopy.height; j += pointillism) {
      let c = imgCopy.get(i, j);
      fill(c);
      noStroke();
      ellipse(
        i * (w / imgCopy.width) + x,
        j * (h / imgCopy.height) + y,
        pointillism,
        pointillism
      );
    }
  }
}

function applyPosterize(x, y, w, h) {
  let imgCopy = imgOriginal.get();
  imgCopy.filter(POSTERIZE, 3);
  image(imgCopy, x, y, w, h);
}

function clipAndMask(x, y, w, h) {
  let imgCopy = imgOriginal.get();
  let maskGraphics = createGraphics(imgCopy.width, imgCopy.height);
  maskGraphics.fill(255);
  maskGraphics.noStroke();
  maskGraphics.beginShape();
  maskGraphics.vertex(0, 0);
  maskGraphics.vertex(imgCopy.width / 2, imgCopy.height / 2);
  maskGraphics.vertex(imgCopy.width, 0);
  maskGraphics.endShape(CLOSE);
  imgCopy.mask(maskGraphics);
  image(imgCopy, x, y, w, h);
}

function clipWithText(x, y, w, h) {
  let imgCopy = imgOriginal.get();
  let textGraphics = createGraphics(imgCopy.width, imgCopy.height);
  textGraphics.fill(255);
  textGraphics.textSize(150);
  textGraphics.text("HI", imgCopy.width / 4, imgCopy.height / 2);
  imgCopy.mask(textGraphics);
  image(imgCopy, x, y, w, h);
}
