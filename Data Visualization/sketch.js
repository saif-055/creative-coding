let data;
let temperatures = [];
let daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
let minTemp, maxTemp;
let margin = 50;

function preload() {
  data = loadTable("My_Data.csv", "csv", "header");
}

function setup() {
  createCanvas(800, 600);
  for (let i = 0; i < daysOfWeek.length; i++) {
    let temp = parseFloat(data.getString(0, daysOfWeek[i]));
    temperatures.push(temp);
  }
  minTemp = min(temperatures);
  maxTemp = max(temperatures);

  drawGraph();
}

function drawGraph() {
  background(240);

  stroke(0);
  line(margin, height - margin, width - margin, height - margin);
  line(margin, margin, margin, height - margin);

  textAlign(CENTER, CENTER);
  textSize(14);
  fill(0);
  for (let i = 0; i < daysOfWeek.length; i++) {
    let x = map(i, 0, daysOfWeek.length - 1, margin, width - margin);
    let y = map(temperatures[i], minTemp, maxTemp, height - margin, margin);

    text(daysOfWeek[i], x, height - margin / 2);

    let tempValue = temperatures[i].toFixed(1);
    text(tempValue, x, y - 20);

    noFill();
    ellipse(x, y, 8, 8);
  }

  beginShape();
  for (let i = 0; i < daysOfWeek.length; i++) {
    let x = map(i, 0, daysOfWeek.length - 1, margin, width - margin);
    let y = map(temperatures[i], minTemp, maxTemp, height - margin, margin);
    vertex(x, y);
  }
  endShape();

  textSize(20);
  textAlign(CENTER);
  text("Weekly Temperatures", width / 2, margin / 2);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
