let cat;
let shapes = [];
let score = 0;
let lives = 3;
let gameState = "title";

let numShapes = 10;
let playerSpeed = 7;

function setup() {
  createCanvas(800, 600);
  cat = new Cat(width / 2, height - 50, 50);

  for (let i = 0; i < numShapes; i++) {
    shapes.push(new Shape(random(width), random(-height, -50), random(20, 40)));
  }
}

function draw() {
  background(220);

  if (gameState === "title") {
    drawTitleScreen();
  } else if (gameState === "playing") {
    handleGameplay();
  } else if (gameState === "gameover") {
    drawGameOverScreen();
  }
}

function drawTitleScreen() {
  textAlign(CENTER);
  textSize(32);
  fill(0);
  text("Shape Collision Game", width / 2, height / 2 - 50);
  textSize(20);
  text(
    "Use arrow keys to move the cat. Avoid the falling shapes!",
    width / 2,
    height / 2
  );
  rectMode(CENTER);
  fill(100);
  rect(width / 2, height / 2 + 50, 120, 50);
  fill(255);
  textAlign(CENTER, CENTER);
  text("Start", width / 2, height / 2 + 50);
}

function handleGameplay() {
  cat.update();
  cat.display();

  for (let shape of shapes) {
    shape.update();
    shape.display();

    if (cat.collidesWith(shape)) {
      lives--;
      if (lives <= 0) {
        gameState = "gameover";
      }
    }
  }

  textSize(18);
  textAlign(LEFT);
  fill(0);
  text(`Score: ${score}`, 20, 30);
  text(`Lives: ${lives}`, 20, 50);
}

function drawGameOverScreen() {
  textAlign(CENTER);
  textSize(32);
  fill(0);
  text("Game Over", width / 2, height / 2 - 50);
  textSize(20);
  text("Your Score: " + score, width / 2, height / 2);
  rectMode(CENTER);
  fill(100);
  rect(width / 2, height / 2 + 50, 120, 50);
  fill(255);
  textAlign(CENTER, CENTER);
  text("Restart", width / 2, height / 2 + 50);
}

function keyPressed() {
  if (gameState === "playing") {
    if (keyCode === LEFT_ARROW) {
      cat.moveLeft();
    } else if (keyCode === RIGHT_ARROW) {
      cat.moveRight();
    }
  }
}

function mouseClicked() {
  if (gameState === "title") {
    if (
      mouseX > width / 2 - 60 &&
      mouseX < width / 2 + 60 &&
      mouseY > height / 2 + 25 &&
      mouseY < height / 2 + 75
    ) {
      startGame();
    }
  } else if (gameState === "gameover") {
    if (
      mouseX > width / 2 - 60 &&
      mouseX < width / 2 + 60 &&
      mouseY > height / 2 + 25 &&
      mouseY < height / 2 + 75
    ) {
      resetGame();
    }
  }
}

function startGame() {
  gameState = "playing";
  score = 0;
  lives = 3;
}

function resetGame() {
  gameState = "playing";
  score = 0;
  lives = 3;
  cat = new Cat(width / 2, height - 50, 50);
  shapes = [];
  for (let i = 0; i < numShapes; i++) {
    shapes.push(new Shape(random(width), random(-height, -50), random(20, 40)));
  }
}

class Cat {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = playerSpeed;
  }

  update() {}

  display() {
    fill(255, 0, 0);
    ellipse(this.x, this.y, this.size);
  }

  moveLeft() {
    this.x -= this.speed;
  }

  moveRight() {
    this.x += this.speed;
  }

  collidesWith(shape) {
    let distance = dist(this.x, this.y, shape.x, shape.y);
    return distance < this.size / 2 + shape.size / 2;
  }
}

class Shape {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = random(2, 5);
  }

  update() {
    this.y += this.speed;
    if (this.y > height + this.size / 2) {
      this.y = random(-height, -50);
      this.x = random(width);
    }
  }

  display() {
    fill(0, 0, 255);
    ellipse(this.x, this.y, this.size);
  }
}
