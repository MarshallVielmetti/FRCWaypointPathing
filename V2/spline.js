class Spline {
  wp;
  fidelity = 100;
  pathing;

  constructor(waypoints, fidelity) {
    this.wp = waypoints;
    // this.fidelity = fidelity;
    this.pathing = this.createPathing();
  }

  createPathing = () => {
    let pathing = [];
    for (let i = 0; i < this.wp.length - 1; i++) {
      //loop the # of waypoints - 1 times.
      let newSpline = SplineUtil.hermiteSpline(
        this.wp[i],
        this.wp[i + 1],
        this.fidelity
      );
      pathing = [...pathing, ...newSpline];
    }

    return pathing;
  };

  recalculate = (waypoints) => {
    this.wp = waypoints;
    this.pathing = this.createPathing();
  };

  getPathing = () => {
    return this.pathing;
  };

  drawSpline = () => {
    strokeWeight(2);
    stroke("green");
    for (let i = 0; i < this.pathing.length - 1; i++) {
      line(
        this.pathing[i][0],
        this.pathing[i][1],
        this.pathing[i + 1][0],
        this.pathing[i + 1][1]
      );
    }
  };
}
