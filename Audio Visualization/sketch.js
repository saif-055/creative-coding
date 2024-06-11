let mic;
let fft;
let spectrum;

function setup() {
  createCanvas(windowWidth, windowHeight);

  mic = new p5.AudioIn();
  mic.start();

  fft = new p5.FFT();
  fft.setInput(mic);

  spectrum = fft.analyze();
}

function draw() {
  background(30);

  let vol = mic.getLevel();

  spectrum = fft.analyze();

  let diam = map(vol, 0, 1, 10, 200);
  let col = map(vol, 0, 1, 0, 255);
  fill(col, 100, 150);
  noStroke();
  ellipse(width / 2, height / 2, diam, diam);

  let spectrumWidth = width / spectrum.length;
  for (let i = 0; i < spectrum.length; i++) {
    let amp = spectrum[i];
    let y = map(amp, 0, 255, height, 0);
    let c = map(i, 0, spectrum.length, 0, 255);
    fill(c, 255, 255);
    rect(i * spectrumWidth, y, spectrumWidth, height - y);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
