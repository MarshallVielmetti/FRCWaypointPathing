let bg;
let waypoints = [];
let selectedInd;
let spline;
let doSpline = false;


//Dom elements
let XInput;
let YInput;
let VXInput;
let VYInput;

let nameInput;

const width = 1140;
const height = 476;

function preload() {
  bg = loadImage('deepspace.png');
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
  console.log(selectedInd)
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

  // if (selectedInd >= 0 && !mouseIsPressed) {
  //   waypoints[selectedInd].setX(XInput.value())
  //   waypoints[selectedInd].setY(YInput.value())
  //   waypoints[selectedInd].setVX(VXInput.value())
  //   waypoints[selectedInd].setVY(VYInput.value())
  // }
}

function keyPressed() {
  //Yes I know this should be a switch statement sue me
  if (keyCode == 32) {
    //SPACEBAR = CLEAR
    background(bg);
    waypoints = [];
    doSpline = false;
  } else if (keyCode == 13) {
    //ENTER = RUN SPLINES

    //obviously make it check
    spline = new Splines(waypoints);
    spline.concatSplines();
    doSpline = true;
    // spline.calcSpline();
  } else if (keyCode == 83) {
    spline.exportPathing(nameInput.value());
  } else {
    //do nothing
    console.log(keyCode)
  }
}