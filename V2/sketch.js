let bgImg;
let waypoints = [];
let selectedInd;
let spline;
let doSpline = false;
let doAnimateRobot = false;
let animateIndex;

//Dom elements
let XInput;
let YInput;
let VXInput;
let VYInput;
let posInput;

let gameDropdown;
let splineDropdown;
let newWaypointButton;
let deleteWaypointButton;

let nameInput;

const width = 1140;
const height = 476;

let dragV;

function preload() {
  bgImg = loadImage("Game Pictures/infiniterecharge.png");
}

function setup() {
  // put setup code here
  createCanvas(bgImg.width, bgImg.height);
  background(bgImg);

  XInput = createInput("");
  XInput.input(updateSelectedWaypoint);
  YInput = createInput("");
  YInput.input(updateSelectedWaypoint);
  VXInput = createInput("");
  VXInput.input(updateSelectedWaypoint);
  VYInput = createInput("");
  VYInput.input(updateSelectedWaypoint);
  nameInput = createInput("Path Name");

  gameDropdown = createSelect();
  gameDropdown.option("Infinite Recharge");
  gameDropdown.option("Deepspace");
  gameDropdown.option("PowerUp");
  gameDropdown.changed(handleChangeGame);

  //TO DO: Implement other spline types and dropdown functionality
  splineDropdown = createSelect();
  splineDropdown.option("Cubic Hermite");
  splineDropdown.option("Quintic Hermite"); // TO DO
  gameDropdown.option("Centripetal Catmull-Roll"); // TO DO
  gameDropdown.changed(handleChangeSpline); // TO DO

  // newWaypointButton = createButton("New Waypoint")
  deleteWaypointButton = createButton("Delete Waypoint");
}

function handleChangeGame() {
  switch (gameDropdown.value()) {
    case "Infinite Recharge":
      bgImg = loadImage("Game Pictures/infiniterecharge.png");
      break;
    case "Deepspace":
      bgImg = loadImage("Game Pictures/deepspace.png");
      break;
    case "PowerUp":
      // bg = loadImage('deepspace.png');
      break;
    default:
      break;
  }
  resizeCanvas(bgImg.width, bgImg.height);
}
//TO DO
function handleChangeSpline() {
  switch (splineDropdown.value()) {
    case "Cubic Hermite":
      break;
    case "Quintic Hermite":
      break;
    case "Centripetal Catmull-Roll":
      break;
    default:
      break;
  }
}

function updateDomInputs() {
  if (selectedWaypoint !== null) {
    XInput.value(selectedWaypoint.x);
    YInput.value(selectedWaypoint.y);
    VXInput.value(selectedWaypoint.vx);
    VYInput.value(selectedWaypoint.vy);
  } else {
    XInput.value(0);
    YInput.value(0);
    VXInput.value(0);
    VYInput.value(0);
  }
}

function updateSelectedWaypoint() {
  if (selectedWaypoint === null) return;

  selectedWaypoint.x = Number(XInput.value());
  selectedWaypoint.y = Number(YInput.value());
  selectedWaypoint.vx = Number(VXInput.value());
  selectedWaypoint.vy = Number(VYInput.value());
}

function mousePressed() {
  console.log(mouseX + " " + mouseY);
  if (mouseX < 0 || mouseY < 0 || mouseX > width || mouseY > height) {
    // selectedWaypoint = null;
    return;
  }

  if (keyIsDown(16)) {
    console.log("Dragging Velocity");
    return;
  } //currently dragging velocity

  console.log("Got Through");

  selectedWaypoint = Waypoint.getClicked(mouseX, mouseY);

  if (selectedWaypoint === null) {
    console.log("New Waypoint");
    let wp = new Waypoint(mouseX, mouseY);
    selectedWaypoint = wp;
  }
  updateDomInputs();
}

function mouseDragged() {
  if (selectedWaypoint === null) return;

  //ERROR IS HERE - CHECKIGN IF CLICKED WHEN UPDATING VELOCITY ALL TIMES
  if (selectedWaypoint.wasClicked(mouseX, mouseY)) {
    if (keyIsDown(16)) {
      selectedWaypoint.vx = selectedWaypoint.x - mouseX;
      selectedWaypoint.vy = selectedWaypoint.y - mouseY;
    } else {
      selectedWaypoint.x = mouseX;
      selectedWaypoint.y = mouseY;
    }
    updateDomInputs();
  }
}

function draw() {
  background(bgImg);
  Waypoint.drawAll();

  if (doSpline) {
    spline.recalculate(Waypoint.wp);
    spline.drawSpline();
  }
}

function keyPressed() {
  switch (keyCode) {
    case 32: //Spacebar = Clear
      background(bgImg);
      waypoints = [];
      doSpline = false;
      break;
    case 13: //Enter = Generate Splines
      //obviously make it check
      spline = new Spline(Waypoint.getWaypoints(), 100);
      doSpline = true;
      break;
    case 83: // S = Save Splines
      spline.exportPathing(nameInput.value());
      break;
    case 65: // A = Animate Robot
      console.log(spline.getSplineLength());
      doAnimateRobot = true;
      animateIndex = 0;
      break;
    case 81: // Q = temp query v
      motionUtil.queryVelocityCurve(8, 400, 5, 20);
      break;
    case 17: //ctrl key, toggles drag Velocity
    // dragV = !dragV;
    default:
      console.log(keyCode);
      break;
  }
}
