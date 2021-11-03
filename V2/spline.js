import splineUtil from "Utils/splineUtil"; //may not work

class Spline {
    
    wp;
    fidelity;
    pathing;

    constructor(waypoints, fidelity) {
        this.wp = waypoints;
        this.fidelity = fidelity;
        this.pathing = this.createPathing();
    }

    createPathing = () => {
        let pathing = [];

        for (let i = 0; i < this.wp.length-1; i++) {
            //loop the # of waypoints - 1 times.
            pathing.concat(splineUtil.hermiteSplines(this.wp[i], this.wp[i+1], this.fidelity))
        }

        return pathing;
    }

    getPathing = () => {
        return this.pathing;
    }
}