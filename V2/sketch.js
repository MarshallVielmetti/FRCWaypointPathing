let bgImg;
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
  posInput = createInput("");
  posInput.input(updateSelectedWaypoint);

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
  deleteWaypointButton.mousePressed(handleDeleteWaypoint);
}

function handleDeleteWaypoint() {
  Waypoint.selectedWaypoint.deleteWaypoint();
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
  if (Waypoint.selectedWaypoint !== null) {
    XInput.value(Waypoint.selectedWaypoint.x);
    YInput.value(Waypoint.selectedWaypoint.y);
    VXInput.value(Waypoint.selectedWaypoint.vx);
    VYInput.value(Waypoint.selectedWaypoint.vy);
    posInput.value(Waypoint.selectedWaypoint.getWaypointPosition());
  } else {
    XInput.value(0);
    YInput.value(0);
    VXInput.value(0);
    VYInput.value(0);
    posInput.value(-1);
  }
}

function updateSelectedWaypoint() {
  if (Waypoint.selectedWaypoint === null) return;

  Waypoint.selectedWaypoint.x = Number(XInput.value());
  Waypoint.selectedWaypoint.y = Number(YInput.value());
  Waypoint.selectedWaypoint.vx = Number(VXInput.value());
  Waypoint.selectedWaypoint.vy = Number(VYInput.value());
  Waypoint.selectedWaypoint.setWaypointPosition(Number(posInput.value()));
}

function mousePressed() {
  if (mouseX < 0 || mouseY < 0 || mouseX > width || mouseY > height) {
    // selectedWaypoint = null;
    return;
  }

  if (keyIsDown(16)) {
    return;
  } //currently dragging velocity
  Waypoint.selectedWaypoint = Waypoint.getClicked(mouseX, mouseY);

  if (Waypoint.selectedWaypoint === null) {
    let wp = new Waypoint(mouseX, mouseY);
    Waypoint.selectedWaypoint = wp;
  }
  updateDomInputs();
}

function mouseDragged() {
  if (Waypoint.selectedWaypoint === null) return;

  if (keyIsDown(16)) {
    Waypoint.selectedWaypoint.vx = mouseX - Waypoint.selectedWaypoint.x;
    Waypoint.selectedWaypoint.vy = mouseY - Waypoint.selectedWaypoint.y;
  } else {
    if (Waypoint.selectedWaypoint.wasClicked(mouseX, mouseY)) {
      Waypoint.selectedWaypoint.x = mouseX;
      Waypoint.selectedWaypoint.y = mouseY;
      updateDomInputs();
    }
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
