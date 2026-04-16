 let items = [];
let palette = [
  [255, 0, 0],       // red
  [0, 0, 255],       // blue
  [255, 255, 0],     // yellow
  [128, 0, 128],     // purple
  [139, 69, 19],     // brown    // cyan
  [255, 105, 180],   // pink
  [0, 255, 0],       // green
  [255, 165, 0],
  [0,255,200]
];
let states = [
  ["hi", "hello", "hey", "yo", "hiya"],
  ["hi", "i'm", "following", "you", "around"],
  ["you", "can't", "escape", "i'm", "sorry"],
  ["i", "believe", "in", "surprising", "design"],
  ["that", "looks", "below", "the", "surface"],
  ["using", "ideas", "to", "inform", "conception"],
  ["creating", "experiences", "to", "bring", "joy"],
  ["using", "colour", "motion", "form", "interactivity"],
  ["with", "coding", "motion", "3d", "direction"],
  ["people", "with", "extraordinary", "working", "awesome"]
];
let state = 0;
const MIN = 175;
let myFont;
function preload(){
  myFont = loadFont('/assets/Inter_18pt-Medium.ttf')
}
function setup() {
let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('sketch-container');
  textFont(myFont);
  textAlign(CENTER, CENTER);
  textSize(50);
let shuffled = shuffle(palette);
for (let i = 0; i < 5; i++) {
    items.push({
      x: random(width),
      y: random(height),
      vx: 0,
      vy: 0,
      c: color(...shuffled[i])
    });
  }
}
function draw() {
  background(4, 4,);
let hover = false;
for (let i = 0; i < items.length; i++) {
let a = items[i];
const MOUSE_FORCE = 0.2;
let dx = mouseX - a.x;
let dy = mouseY - a.y;
let d = sqrt(dx * dx + dy * dy) + 0.0001;
    a.vx += (dx / d) * MOUSE_FORCE;
    a.vy += (dy / d) * MOUSE_FORCE;
    a.vx *= 0.95;
    a.vy *= 0.95;
    a.x += a.vx;
    a.y += a.vy;
if (abs(mouseX - a.x) < 37 && abs(mouseY - a.y) < 37) {
      hover = true;
    }
    fill(a.c);
    text(states[state][i], a.x, a.y);
  }
// separation
for (let i = 0; i < items.length; i++) {
for (let j = i + 1; j < items.length; j++) {
let a = items[i], b = items[j];
let dx = b.x - a.x;
let dy = b.y - a.y;
let d = sqrt(dx * dx + dy * dy);
if (d < MIN) {
let push = (MIN - d) * 0.5;
let nx = dx / (d + 0.001);
let ny = dy / (d + 0.001);
        a.x -= nx * push;
        a.y -= ny * push;
        b.x += nx * push;
        b.y += ny * push;
      }
    }
  }
  cursor(hover ? HAND : ARROW);
}
function handleInteraction() {
for (let a of items) {
if (dist(mouseX, mouseY, a.x, a.y) < 37) {
      state = (state + 1) % states.length;
break;
    }
  }
}
function mousePressed() {
  handleInteraction();
}
function touchStarted() {
  handleInteraction();
return false; // prevents page scrolling on mobile
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
