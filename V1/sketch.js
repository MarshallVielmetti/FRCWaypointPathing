let bg;
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

let gameDropdown;
let splineDropdown;

let nameInput;

const width = 1140;
const height = 476;

let robot;

function preload() {
  bg = loadImage('Game Pictures/infiniterecharge.png');
  robot = new Robot(40, 40)
  robot.printRobot();
} 

function setup() {
  // put setup code here
  createCanvas(1140, 476);
  background(bg);
  
  XInput = createInput('');
  YInput = createInput('');
  VXInput = createInput('');
  VYInput = createInput('');
  nameInput = createInput('Path Name');

  gameDropdown = createSelect();
  gameDropdown.option('Infinite Recharge');
  gameDropdown.option('Deepspace');
  gameDropdown.option('PowerUp');
  gameDropdown.changed(handleChangeGame);

  //TO DO: Implement other spline types and dropdown functionality
  splineDropdown = createSelect();
  splineDropdown.option('Cubic Hermite');
  splineDropdown.option('Quintic Hermite'); // TO DO
  gameDropdown.option('Centripetal Catmull-Roll'); // TO DO
  gameDropdown.changed(handleChangeSpline); // TO DO
}

function handleChangeGame() {
  switch(gameDropdown.value()) {
    case "Infinite Recharge":
      bg = loadImage('Game Pictures/infiniterecharge.png');
      break;
    case "Deepspace": 
      bg = loadImage('Game Pictures/deepspace.png');
      break;
    case "PowerUp":
      // bg = loadImage('deepspace.png');
      break;
    default:
      break;
  }
}
//TO DO
function handleChangeSpline() {
  switch(splineDropdown.value()) {
    case 'Cubic Hermite':
      break;
    case 'Quintic Hermite':
      break;
    case 'Centripetal Catmull-Roll':
      break;
    default:
      break;
  }
}

function mousePressed() {
  if (mouseX < 0 || mouseY < 0 || mouseX > width || mouseY > height) {
    return;
  }
  selectedInd = -1;
  //make sure there are even waypoints to loop through
  if (waypoints.length > 0) {
    for (let i = 0; i < waypoints.length; i++) {
      if (waypoints[i].wasClicked(mouseX, mouseY)) {
        selectedInd = i;
        waypoints[i].handleClicked(); 

        XInput.value(waypoints[selectedInd].getX())
        YInput.value(waypoints[selectedInd].getY())
        VXInput.value(waypoints[selectedInd].getVX())
        VYInput.value(waypoints[selectedInd].getVY())
        return;
      }
    }
  }
  //if none of the waypoints were clicked
  //create a new waypoint
  if (waypoints.length > 0) {
    selectedInd = waypoints.length;
  } else {
    selectedInd = 0;
  }
  waypoints.push(new Waypoint(mouseX, mouseY));

  if (selectedInd == -1) {
    //clear custom boxes
    XInput.value(0)
    YInput.value(0)
    VXInput.value(0)
    VYInput.value(0)
  } else {
    XInput.value(waypoints[selectedInd].getX())
    YInput.value(waypoints[selectedInd].getY())
    VXInput.value(waypoints[selectedInd].getVX())
    VYInput.value(waypoints[selectedInd].getVY())
  }
  
  return false;
}

function mouseDragged() {
  if(selectedInd >= 0) {
    waypoints[selectedInd].updateVelocity(mouseX, mouseY)
  }
}

function draw() {
  background(bg);
    for (let i = 0; i < waypoints.length; i++) {
      waypoints[i].display();
  }

  if (doSpline) {
    spline.graph();
  }

  if (doAnimateRobot) {
    let valuePairs = spline.getValuePairs();
    robot.drawRobot(valuePairs[animateIndex][0], valuePairs[animateIndex][1], valuePairs[animateIndex+1][0], valuePairs[animateIndex+1][1])
    ++animateIndex;
    if (animateIndex >= valuePairs.length - 1) {
      doAnimateRobot = false;
      robot.clearRobot();
    }
  }

  // if (selectedInd >= 0 && !mouseIsPressed) {
  //   waypoints[selectedInd].setX(XInput.value())
  //   waypoints[selectedInd].setY(YInput.value())
  //   waypoints[selectedInd].setVX(VXInput.value())
  //   waypoints[selectedInd].setVY(VYInput.value())
  // }
}

function keyPressed() {
  switch(keyCode) {
    case 32: //Spacebar = Clear
      background(bg);
      waypoints = [];
      doSpline = false;
      break;
    case 13: //Enter = Generate Splines
    //obviously make it check
      spline = new Splines(waypoints);
      spline.concatSplines();
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
    default:
      console.log(keyCode)
      break;
  }
}