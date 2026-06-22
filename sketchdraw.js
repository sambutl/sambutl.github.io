let slider;
let button;
let brushButton;
let exportButton;
let item;


let palette = [
  [255,0,0],[0,0,255],[255,255,0],[128,0,128],[139,69,19],
  [255,105,180],[0,255,0],[255,165,0],[0,255,200],
  [224,59,40],[245,61,155],[130,184,217],[58,122,58],
  [212,168,50],[76,191,90],[232,200,74],[217,68,32],[168,204,222]
];

let words = [
  "brush",
  "BOLD",
  "light",
  "brush, BOLD, light"
];

let ratios = [
  "full",
  "ratio-4-5",
  "ratio-9-16"
];
let currentRatio = 0;

let currentWord = 0;

let myFont;
let mx = 0, my = 0;

const MIN = 180;
const MIN_SQ = MIN * MIN;
const INV_DAMP = 0.95;
const FORCE = 0.3;

function preload() {
  myFont = loadFont('/assets/Inter_18pt-Medium.ttf');
}

function setup() {
  slider = document.getElementById("slider");
  button = document.getElementById("button");
  brushButton = document.getElementById("brushButton");
  exportButton = document.getElementById("exportButton");

    let container = document.getElementById("sketch-container");

  let canvas = createCanvas(
    container.offsetWidth,
    container.offsetHeight
  );

  canvas.parent("sketch-container");

  textFont(myFont);
  textAlign(CENTER, CENTER);
  noStroke();

  background(255);

  let s = shuffle(palette.slice());


item = {
  x: random(width),
  y: random(height),
  vx: 0,
  vy: 0,
  c: color(...s[0])
};

  mx = width * 0.5;
  my = height * 0.5;
}

function randomColour() {
  let c = random(palette);
  item.c = color(...c);
}

function randomBrush() {
currentWord = floor(random(words.length));
 let c = random(palette);
  item.c = color(...c);
}

function draw() {

  mx += (mouseX - mx) * 0.15;
  my += (mouseY - my) * 0.15;

  let word = words[currentWord];

  textSize(Number(slider.value));

let dx = mx - item.x;
let dy = my - item.y;

let inv = FORCE / sqrt(dx * dx + dy * dy + 0.01);

item.vx = (item.vx + dx * inv) * INV_DAMP;
item.vy = (item.vy + dy * inv) * INV_DAMP;

item.x += item.vx;
item.y += item.vy;

fill(item.c);
text(words[currentWord], item.x, item.y);
}

function windowResized() {
  let container = document.getElementById("sketch-container");

  resizeCanvas(
    container.offsetWidth,
    container.offsetHeight
  );
}

function changeRatio() {

  let sketch = document.getElementById("sketch-container");

  sketch.classList.remove(
    "ratio-4-5",
    "ratio-9-16"
  );

  currentRatio++;

  if (currentRatio >= ratios.length) {
    currentRatio = 0;
  }

  if (ratios[currentRatio] !== "full") {
    sketch.classList.add(ratios[currentRatio]);
  }


  setTimeout(() => {
    resizeCanvas(
      sketch.offsetWidth,
      sketch.offsetHeight
    );
  }, 350);
}

function exportPNG(){
saveCanvas("expression", "png");
}

function touchStarted() {
 
  mousePressed();
  return false; 
}


function touchMoved() {
  mouseDragged();
  return false;
}


function touchEnded() {
  mouseReleased();
  return false;
}