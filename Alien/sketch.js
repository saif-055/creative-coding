function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  fill(150, 220, 150);
  ellipse(200, 200, 120, 150);

  fill(255);
  ellipse(180, 180, 20, 20);
  ellipse(220, 180, 20, 20);
  fill(0);
  ellipse(180, 180, 10, 10);
  ellipse(220, 180, 10, 10);

  noFill();
  stroke(0);
  strokeWeight(2);
  arc(200, 200, 40, 20, 0, PI);

  stroke(0);
  strokeWeight(3);
  line(200, 150, 200, 100);
  fill(150, 220, 150);
  ellipse(200, 100, 10, 10);
}
