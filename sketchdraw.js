let slider;
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
let overFont;
const INV_DAMP = 0.95;
const FORCE = 0.9;

let showTitle = false;
let showDisclaimer = false;

function preload() {
  myFont = loadFont('/assets/Inter_18pt-Medium.ttf');
  overFont = loadFont('/assets/authentic-sans-condensed-150.otf');
}

function setup() {
  slider = document.getElementById("slider");
  pixelDensity(2);
  let canvas = createCanvas(1080, 1440);
  canvas.parent("sketch-container");
  canvas.elt.style.width = "";
  canvas.elt.style.height = "";
  textFont(myFont);
  textAlign(CENTER, CENTER);
  noStroke();
  background(253);

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

function textTitle(){
  showTitle = !showTitle;
  if (showTitle) {
    showDisclaimer = false; 
  } else {
    background(253); 
  }
}

function textOver(){
  showDisclaimer = !showDisclaimer;
  if (showDisclaimer) {
    showTitle = false; 
  } else {
    background(253); 
  }
}


function drawTitle(){
  let quote = "I VISITED\nSAMBUTLER.SITE";
  let quote2 = "AND ALL I GOT\nWAS THIS LOUSY\nPOSTER";

  textFont(overFont);
  textAlign(CENTER, CENTER);
  fill(2);
  noStroke();

  textSize(120);
  text(quote, 1080/2, 500);
  text(quote2, 1080/2, 880);
}


function drawDisclaimer(){
  let disclaimer = "DISCLAIMER\n\nBy creating this poster you hereby grant complete ownership of every piece of knowledge you (the User) possess about all things design. This includes, but is not limited to, in the event of an Act of God, full possession of, and agreement with: Declaring the Magic Mouse the worst piece of design ever concieved, failiure to agree grants a lifetime penence of only being able to use the Magic Mouse without a mouse mat for all After Effects useage, your whole hard drive of typeface files, with infinate licences (thanks for the fonts), your ability to perfectly centre something by eye on the first attempt; any future \"I could've made that in five minutes\" opinions you may have; the exclusive rights to every shower thought; all unused creative genius currently stored in the mysterious folder named \"Final_v2_Final_v1_UseME\". This agreement shall remain valid until the heat death of the universe, or I decide to free you.\nWhatever comes first.";

  textFont(overFont);
  textAlign(LEFT);
  fill(200);
  noStroke();
  textSize(18);
  text(disclaimer, 50, 1280, 950);
}

function draw() {
  if (showTitle) drawTitle();
  if (showDisclaimer) drawDisclaimer();

  if (
    mouseX >= 0 &&
    mouseX <= width &&
    mouseY >= 0 &&
    mouseY <= height
  ) {
    mx += (mouseX - mx) * 0.25;
    my += (mouseY - my) * 0.25;
  }
  let dx = mx - item.x;
  let dy = my - item.y;
  let inv = FORCE / sqrt(dx * dx + dy * dy + 0.05);
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

function randomColour(){
  item.c = color(...random(palette));
}

function randomBrush(){
  currentWord = floor(random(words.length));
  item.c = color(...random(palette));
}


function exportPNG(){
  if (showTitle) drawDate();
  saveCanvas("expression","png");
  background(253);

  if (showTitle) drawTitle();
  else if (showDisclaimer) drawDisclaimer();
}

function drawDate(){
    let now = new Date();
  let dateTimeStr = now.toLocaleString();
  textSize(18);
 let parts = dateTimeStr.split(", ");

let dateStr = parts[0];
let timeStr = parts[1];
fill(2);
text(dateStr, 540, 140);
text(timeStr, 540, 1300);
}