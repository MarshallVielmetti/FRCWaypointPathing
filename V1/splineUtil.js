class SplineUtil {

    /**
     * 
     * @param {waypoint} wp1 Starting Waypoint
     * @param {waypoint} wp2 Ending Waypoint
     * @param {Int64} fidelity Numer of Points to Sample
     */
    static hermiteSpline = (wp1, wp2, fidelity) => {
        //should all be converted to custom vector objects soon
        let p0 = wp1.getPosVector();
        let m0 = wp1.getVelVector();
        let p1 = wp2.getPosVector();
        let m1 = wp2.getVelVector();

        let points = []

        for (let i = 0; i < fidelity; i++) {
            let t = i / fidelity;
            let newVals = []
            for (let d = 0; d < 2; d++) {
                //loop through both dimensions of the array (no vector ops in JS)
                newVals[d] = (2*t**3 - 3*t**2 + 1)*p0[d] + (t**3 - 2*t**2 + t)*m0[d] + (-2*t**3 + 3*t**2)*p1[d] + (t**3 - t**2)*m1[d]
            }

            points[i] = newVals;
        }

        return points;
    }
}