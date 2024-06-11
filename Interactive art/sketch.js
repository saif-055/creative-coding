let particles_a = [];
let particles_b = [];
let particles_c = [];
let nums = 400;
let noiseScale = 800;
let displayText = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < nums; i++) {
    particles_a[i] = new Particle(random(0, width), random(0, height));
    particles_b[i] = new Particle(random(0, width), random(0, height));
    particles_c[i] = new Particle(random(0, width), random(0, height));
  }
}

function draw() {
  background(255);
  smooth();
  noStroke();

  for (let i = 0; i < nums; i++) {
    let radius = map(i, 0, nums, 5, 10);
    let alpha = map(i, 0, nums, 50, 200);

    fill(240, 200, 125, alpha);
    particles_a[i].move();
    particles_a[i].display(radius);
    particles_a[i].checkEdge();

    fill(160, 205, 200, alpha);
    particles_b[i].move();
    particles_b[i].display(radius);
    particles_b[i].checkEdge();

    fill(190, 90, 90, alpha);
    particles_c[i].move();
    particles_c[i].display(radius);
    particles_c[i].checkEdge();
  }

  if (displayText) {
    fill(0);
    textSize(100);
    textAlign(CENTER, CENTER);
    text("Saif", width / 2, height / 2);
  }
}

function mousePressed() {
  displayText = true;
}

function Particle(x, y) {
  this.dir = createVector(0, 0);
  this.vel = createVector(0, 0);
  this.pos = createVector(x, y);
  this.speed = 0.4;

  this.move = function () {
    let angle =
      noise(this.pos.x / noiseScale, this.pos.y / noiseScale) *
      TWO_PI *
      noiseScale;
    this.dir.x = cos(angle);
    this.dir.y = sin(angle);
    this.vel = this.dir.copy();
    this.vel.mult(this.speed);
    this.pos.add(this.vel);
  };

  this.checkEdge = function () {
    if (
      this.pos.x > windowWidth ||
      this.pos.x < 0 ||
      this.pos.y > windowHeight ||
      this.pos.y < 0
    ) {
      this.pos.x = random(50, windowWidth - 50);
      this.pos.y = random(50, windowHeight - 50);
    }
  };

  this.display = function (r) {
    ellipse(this.pos.x, this.pos.y, r, r);
  };
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
