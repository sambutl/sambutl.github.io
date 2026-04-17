let items = [];
let palette = [
  [255,0,0],[0,0,255],[255,255,0],[128,0,128],[139,69,19],
  [255,105,180],[0,255,0],[255,165,0],[0,255,200]
];
let states = [
  ["hi","hello","hey","yo","hiya"],
  ["hi","i'm","following","you","around"],
  ["you","can't","escape","i'm","sorry"],
  ["i","believe","in","surprising","design"],
  ["that","looks","below","the","surface"],
  ["using","ideas","to","inform","conception"],
  ["creating","experiences","to","bring","joy"],
  ["using","colour","motion","form","interactivity"],
  ["with","coding","motion","3d","direction"],
  ["people","with","extraordinary","working","awesome"],
];
let state = 0;
let myFont;
let myFontThin;
let mx = 0, my = 0;
let prevHover = false;
const MIN = 180, MIN_SQ = MIN * MIN;
const HOVER = 45;
const INV_DAMP = 0.95, FORCE = 0.2;

function preload() {
  myFont = loadFont('/assets/Inter_18pt-Medium.ttf');
  myFontThin = loadFont('/assets/Inter_18pt-Thin.ttf');
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('sketch-container');
  textFont(myFont);
  textAlign(CENTER, CENTER);
  textSize(50);
  noStroke();
  pixelDensity(Math.min(pixelDensity(), 2));

  let s = shuffle(palette.slice());
  for (let i = 0; i < 5; i++)
    items.push({ x: random(width), y: random(height), vx: 0, vy: 0, c: color(...s[i]), hint: false });

  // 6th hint item — physics-enabled, just like the others
  items.push({ x: random(width), y: random(height), vx: 0, vy: 0, c: color(255), hint: true });

  mx = width * 0.5; my = height * 0.5;
}

function draw() {
  mx += (mouseX - mx) * 0.15;
  my += (mouseY - my) * 0.15;
  background(4, 4, );

  let hover = false;
  let words = states[state];
  let n = items.length;

  // ── Physics + render ────────────────────────────────────────────────────
  for (let i = 0; i < n; i++) {
    let a = items[i];
    let dx = mx - a.x, dy = my - a.y;
    let inv = FORCE * (dx*dx + dy*dy + 0.01) ** -0.5;
    a.vx = (a.vx + dx * inv) * INV_DAMP;
    a.vy = (a.vy + dy * inv) * INV_DAMP;
    a.x += a.vx;
    a.y += a.vy;

    if (!hover && Math.abs(mouseX - a.x) < HOVER && Math.abs(mouseY - a.y) < HOVER)
      hover = true;

    if (a.hint) {
      textFont(myFontThin);
      textSize(18);
      fill(255);
      text("click a word", a.x, a.y);
      textFont(myFont);
      textSize(50);
    } else {
      fill(a.c);
      text(words[i], a.x, a.y);
    }
  }

  if (hover !== prevHover) { cursor(hover ? HAND : ARROW); prevHover = hover; }

  // ── Separation ───────────────────────────────────────────────────────────
  for (let i = 0; i < n - 1; i++) {
    for (let j = i + 1; j < n; j++) {
      let a = items[i], b = items[j];
      let dx = b.x - a.x, dy = b.y - a.y;
      let dSq = dx*dx + dy*dy;
      if (dSq < MIN_SQ) {
        let f = (MIN * (dSq ** -0.5) - 1) * 0.5;
        a.x -= dx*f; a.y -= dy*f;
        b.x += dx*f; b.y += dy*f;
      }
    }
  }
}

function handleInteraction() {
  for (let a of items) {
    if (dist(mouseX, mouseY, a.x, a.y) < HOVER) {
      state = (state + 1) % states.length;
      // Remove hint item on first click
      items = items.filter(item => !item.hint);
      break;
    }
  }
}

function mousePressed()  { handleInteraction(); }
function touchStarted()  { handleInteraction(); return false; }
function windowResized() { resizeCanvas(windowWidth, windowHeight); }