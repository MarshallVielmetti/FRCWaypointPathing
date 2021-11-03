class motionUtil {
    static getSplineLength(valuePairs) {
        let distance = 0;
        for(let i = 0; i < valuePairs.length - 1; i++) {
            distance+= vecUtil.getMagnitude(vecUtil.subtractVec(valuePairs[i+1], valuePairs[i]))
        }

        return distance;
    }

    static getCumulativeLengthAtEach(valuePairs) {
        let distances = []
        distances[0] = 0;
        for(let i = 0; i < valuePairs.length-1; i++) {
            distances[i+1] = distances[i] + vecUtil.getMagnitude(vecUtil.subtractVec(valuePairs[i+1], valuePairs[i]))
        }

        return distances;
    }

    /**
     * 
     * @param {x} t query time
     * @param {x} distance total spline length
     * @param {*} tta time to accelerate to max velocity
     * @param {*} vmax max desired velocity
     */
    static queryVelocityCurve(t, d, tta, vmax ) {
        //Returns S motion curve for a given spline
        console.log('running')
        const ar = vmax / tta;
        const amax = ar*2; //as - max acceleration
        const jmax = 2*amax/tta; //max jerk

        const accelDistance = 0.5*tta*vmax; //distance covered during acceleration phase

        const decelTime = (d - 2*accelDistance)/vmax - tta
        //concave acc phase
        const v0 = 0;

        //convex acc phase

        //constant V

        //convex deacc phase

        //concave deacc phase

        if (t < tta) {
            //initial acceleration phase
            console.log('accel')
        } else if (t < decelTime) {
            //constant velocity phase
            console.log('constnat')
        } else {
            //deceleration phase
            console.log('dcell')
        }

    }

    //generate time parametrization of spline vals
    /**
     * 
     * @param {*} splinevals value pairs from spline
     * @param {*} tta timt to spend accelerating
     * @param {*} vmax desired max robot velocity
     */
    static queryPositionToTime(splinevals, tta, vmax) {
        const distance = motionUtil.getSplineLength(splinevals);
        const distancePoints = motionUtil.getCumulativeLengthAtEach(splinevals);
        
        const accelDistance = 0.5*tta*vmax;

        const decelDistance = distance - accelDistance;

        const ar = vmax / tta; //constant acceleration rate
        const amax = ar*2; //as - max acceleration
        const jmax = 2*amax/tta; //max jerk

        distancepoints.map(s => {

            //switch statement emulates piecewise function
            //should probably create a function for each stage
            //that takes an initial condition but whatever
            switch(s) {
                case s < accelDistance:
                    //accel phase
                    if (s < accelDistance / 2) {
                        //concave phase
                        
                        //s(t) = v0*t + (jm*t**3)/6
                        //v0 -> 0
                        //t = Math.cbrt(6*s/jmax)   
                        return Math.cbrt(6*s/jmax)
                    } else {
                        //convex phase - tta/2 -> tta
                        //assume from 0 -> tta/2
                        t1 = tta/2;
                        v1 = vmax/2;
                        s1 = (jmax*t1**3)/6; //each eqn assumes starting from 0
                        //this is the pos we need to subtract get time

                        //s(t) = v1*t + (amax*t^2)2 - (jmax * t^3)/6 + s1
                        

                        return t + t1;
                    }
                    break;
                case s < decelDistance:
                    //linear phase

                    //basic algebra yields the following
                    //s = accelDistance + vmax*(t- tta)
                    //(s - accelDistance)/vmax + tta = t
                    //time spent linear + time spent accelerating
                    return (s - accelDistance)/vmax + tta;
                case s >= decelDistance:
                    //decel phase
                    if (s < distance-accelDistance/2) {
                        //convex phase
                    } else {
                        //concave phase
                    }
                    break;
                default:
                    return 1;
            }
        })
    }
}