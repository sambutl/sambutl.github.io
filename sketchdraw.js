let slider;
let aspectMode = "fullscreen";

let item;
let currentWord = 0;

let words = [
  "brush",
  "BOLD",
  "light",
  "brush, BOLD, light"
];

let palette = [
  [255,0,0],[0,0,255],[255,255,0],[128,0,128],[139,69,19],
  [255,105,180],[0,255,0],[255,165,0],[0,255,200],
  [224,59,40],[245,61,155],[130,184,217],[58,122,58],
  [212,168,50],[76,191,90],[232,200,74],[217,68,32],[168,204,222]
];

let mx;
let my;

let myFont;

const INV_DAMP = 0.95;
const FORCE = 0.3;


function preload() {
  myFont = loadFont('/assets/Inter_18pt-Medium.ttf');
}


function setup() {

  slider = document.getElementById("slider");

  let canvas = createCanvas(100,100);
  canvas.parent("sketch-container");

  resizeSketch();

  textFont(myFont);
  textAlign(CENTER,CENTER);
  noStroke();

  background(255);

  item = {
    x: random(width),
    y: random(height),
    vx: 0,
    vy: 0,
    c: color(...random(palette))
  };

  mx = width / 2;
  my = height / 2;
}


function draw() {

  if (
    mouseX >= 0 &&
    mouseX <= width &&
    mouseY >= 0 &&
    mouseY <= height
  ) {
    mx += (mouseX - mx) * 0.15;
    my += (mouseY - my) * 0.15;
  }


  let dx = mx - item.x;
  let dy = my - item.y;

  let inv = FORCE / sqrt(dx * dx + dy * dy + 0.01);

  item.vx = (item.vx + dx * inv) * INV_DAMP;
  item.vy = (item.vy + dy * inv) * INV_DAMP;

  item.x += item.vx;
  item.y += item.vy;


  fill(item.c);
textSize(Number(slider.value));

  text(
    words[currentWord],
    item.x,
    item.y
  );
}


function resizeSketch(){

  let container = document.getElementById("sketch-container");

  let w = container.clientWidth;
  let h = container.clientHeight;


  if (aspectMode === "portrait") {

    w = h * 4 / 5;

    if (w > container.clientWidth) {
      w = container.clientWidth;
      h = w * 5 / 4;
    }
  }


  resizeCanvas(w,h);
  background(255);
}



function windowResized(){
  resizeSketch();
}



function toggleAspect(){

  if (aspectMode === "fullscreen") {
    aspectMode = "portrait";
  } else {
    aspectMode = "fullscreen";
  }

  resizeSketch();
}



function randomColour(){
  item.c = color(...random(palette));
}



function randomBrush(){
  currentWord = floor(random(words.length));
  item.c = color(...random(palette));
}



function exportPNG(){
  saveCanvas("expression","png");
}