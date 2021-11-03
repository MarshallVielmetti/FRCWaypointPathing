import Spline from "spline";

class RobotDriver {
    WIDTH = 20;
    HEIGHT = 20;

    CONSTRAINTS;
    SPLINE;
    PATH;

    x; //X Position of Center of Robot
    y; //Y Position of Center of Robot
    t; //time into simulation

    tstep = 0.1;

    //Orientation Vector (Magnitude 1)
    orientation = new Vector();

    //Wheel Motion Planning
    wheelV = new Vector();
    wheelA = new Vector();
    wheelJ = new Vector();

    constructor(spline, constraints) {
        this.CONSTRAINTS = constraints;
        this.SPLINE = spline;
        this.PATH = spline.getPathing();
    }

    initDrive = () => {
        this.x = this.PATH[0][0];
        this.y = this.path[0][1];

        this.t = 0;

        this.orientation.set([0, 0])

        this.wheelV.set([0, 0])
        this.wheelA.set([0, 0]);
        this.wheelJ.set([0, 0]);

    }

    driveStep = () => {
        this.t += this.tstep;

        //MAIN DRIVER CONTROLLER

        lookaheadDistance = this.calculateSlowdown();

        
    }

    calculateSlowdown = () => {
        /*
        p = (1/6)jt^3 + (1/2)ta^2 + vt + 0 //distance to slowdown
        v = (1/2)jt^2 + ta + v0 // min time to slowdown
        a = j0t + a
        j = j0
        */
    }


    drawRobot = () => {
        cornerPoints = []

        // function of current and next position
        let slopeVec = [vx - curX, nextY -curY]
        let scaledVec = vecUtil.scaleToMagnitude(slopeVec, this.h);
        let halfScaled = vecUtil.scaleVec(scaledVec, 0.5)

        let scaledInvHalf = vecUtil.scaleToMagnitude(vecUtil.invertVec(halfScaled), width/2)
        let backLeftCorner = vecUtil.addVec(vecUtil.subtractVec([curX, curY], halfScaled), scaledInvHalf)
        let backRightCorner = vecUtil.subtractVec(vecUtil.subtractVec([curX, curY], halfScaled), scaledInvHalf)
        this.cornerPoints.push(backLeftCorner)
        this.cornerPoints.push(backRightCorner)

        strokeWeight(3)
        stroke('green')
        vecUtil.vecToLine(backLeftCorner, scaledVec)
        vecUtil.vecToLine(backRightCorner, scaledVec)
        stroke('red')
        vecUtil.vecToLine([curX, curY], scaledVec)
    }
}