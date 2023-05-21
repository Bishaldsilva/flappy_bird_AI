const TOTAL = 300;
let birds = [];
let savedBirds = [];
let pipes = [];
let slider;

function setup() {
  createCanvas(800, 600);
  slider = createSlider(1, 200, 1, 1);
  for (let i = 0; i < TOTAL; i++) {
    birds.push(new Bird());
  }
  pipes.push(new Pipe());
}

function draw() {
  background(0);

  for (let j = 0; j < slider.value(); j++) {
    for (let i of birds) {
      i.update();
      i.think(pipes);
    }
    for (let i = 0; i < pipes.length; i++) {
      pipes[i].update();
    }
    for (let i = 0; i < birds.length; i++) {
      if (pipes[0].hit(birds[i]) || birds[i].y > height || birds[i].y < 0) {
        savedBirds.push(birds.splice(i, 1)[0]);
      }
    }
    if (birds.length === 0) {
      nextGeneration();
      pipes = [new Pipe()];
    }
    if (pipes[pipes.length - 1].x < width / 2) {
      pipes.push(new Pipe());
    }
    if (pipes[0].x + pipes[0].w < 0) {
      pipes.splice(0, 1);
    }
  }

  // all drawings here
  for (let i of pipes) {
    i.show();
  }
  for (let i of birds) {
    i.show();
  }
}

function keyPressed() {
  if (key === ' ') {
    console.log("pressed");
    bird.up();
  }
}
