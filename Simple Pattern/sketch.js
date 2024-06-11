let rows = 10;
let cols = 10;
let distanceX = 50;
let distanceY = 50;

let palette = ["#FFD700", "#FF6347", "#4682B4", "#90EE90"];

class Pattern {
  constructor() {
    this.generatePattern();
  }

  generatePattern() {
    this.pattern = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        let randomColor = random(palette);
        let shape = floor(random(0, 3));
        let size = random(20, 40);
        this.pattern.push({
          color: randomColor,
          shape: shape,
          size: size,
          x: c * distanceX + distanceX / 2,
          y: r * distanceY + distanceY / 2,
        });
      }
    }
  }

  draw() {
    background(240);
    rectMode(CENTER);
    ellipseMode(CENTER);

    for (let i = 0; i < this.pattern.length; i++) {
      let { color, shape, size, x, y } = this.pattern[i];
      fill(color);
      if (shape === 0) {
        ellipse(x, y, size, size);
      } else if (shape === 1) {
        rect(x, y, size, size);
      }
    }
  }
}

let pattern;

function setup() {
  createCanvas(600, 600);
  pattern = new Pattern();
  pattern.draw();
}

function mouseClicked() {
  pattern.generatePattern();
  pattern.draw();
}
