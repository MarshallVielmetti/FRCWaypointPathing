class Waypoint {
  x;
  y;
  vx;
  vy;

  static r = 15;

  static wp = []; //array of waypoints

  static selectedWaypoint;

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;

    Waypoint.wp.push(this);
  }

  display = () => {
    if (this === Waypoint.selectedWaypoint) {
      stroke("yellow");
    } else {
      stroke("orange");
    }

    fill("orange");
    ellipse(this.x, this.y, 15, 15);
    stroke("red");
    strokeWeight(4);
    line(this.x - this.vx, this.y - this.vy, this.x, this.y);
    stroke("blue");
    line(this.x, this.y, this.x + this.vx, this.y + this.vy);
  };

  getWaypointPosition = () => {
    return Waypoint.wp.indexOf(this);
  };

  setWaypointPosition = (newPos) => {
    Waypoint.wp.splice(this.getWaypointPosition(), 1);
    Waypoint.wp.splice(newPos, 0, this);
    return newPos;
  };

  static getWaypoints = () => {
    return Waypoint.wp;
  };

  //Function to determine in an individual waypoints was clicked
  wasClicked = (mx, my) => {
    let d = dist(mx, my, this.x, this.y);

    if (d < Waypoint.r) return true;

    return false;
  };

  deleteWaypoint = () => {
    Waypoint.wp.splice(this.getWaypointPosition(), 1);
  };

  getPosVector = () => {
    return [this.x, this.y];
  };

  getVelVector = () => {
    return [this.vx, this.vy];
  };

  //Helper function to return waypoint that was clicked
  static getClicked = (mouseX, mouseY) => {
    if (Waypoint.wp.length <= 0) {
      return null;
    }

    for (let i = 0; i < Waypoint.wp.length; i++) {
      if (Waypoint.wp[i].wasClicked(mouseX, mouseY)) return Waypoint.wp[i];
    }
    return null;
  };

  static drawAll = () => {
    for (let i = 0; i < Waypoint.wp.length; i++) {
      Waypoint.wp[i].display();
    }
  };
}
