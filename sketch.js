let bg;
let waypoints = [];

function preload() {
  bg = loadImage('deepspace.png');
} 

function setup() {
  // put setup code here
  createCanvas(1140, 476);
  background(bg);
}

function mousePressed() {
  //make sure there are even waypoints to loop through
  if (waypoints.length > 0) {
    for (let i = 0; i < waypoints.length; i++) {
      if (waypoints[i].wasClicked(mouseX, mouseY)) {
        waypoints[i].handleClicked(); //TO DO
        return;
      }
    }
  }
  //if none of the waypoints were clicked
  //create a new waypoint
  waypoints.push(new Waypoint(mouseX, mouseY));
  while(mousePressed) {
    waypoints[waypoints.length].updateVelocity(mouseX, mouseY);
  }
  console.log('new waypoint')
}

function draw() {
    for (let i = 0; i < waypoints.length; i++) {
      waypoints[i].display();
    }
}