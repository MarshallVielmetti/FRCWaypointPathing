class NewSpline {
    constructor(waypoints, splineType, splineFidelity) {
        this.wp = waypoints;
        this.fidelity = splineFidelity;
        this.splineType = splineType; //TO DO
    }

    createPathing = () => {
        let pathing = [];

        for (let i = 0; i < this.wp.length-1; i++) {
            //loop the # of waypoints - 1 times.
            pathing.concat(splineUtil.hermiteSplines(this.wp[i], this.wp[i+1], this.fidelity))
        }

        return pathing;
    }
}