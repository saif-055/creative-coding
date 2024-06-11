let trail = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(240);
}

function draw() {
  background(240, 50);

  trail.push({ x: mouseX, y: mouseY });

  if (trail.length > 50) {
    trail.shift();
  }

  for (let i = 0; i < trail.length; i++) {
    let alpha = map(i, 0, trail.length, 255, 0);
    fill(0, alpha);
    noStroke();
    let size = map(i, 0, trail.length, 10, 120);
    ellipse(trail[i].x, trail[i].y, size, size);
  }
}
