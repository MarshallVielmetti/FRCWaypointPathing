
class RobotDriver {
    //Uses the framework described http://www.cs.columbia.edu/~allen/F17/NOTES/icckinematics.pdf to understand motion
    WIDTH = 20; //l - width between wheels
    theta;//Angle WRT X Axis
    x; //X Position of Center of Robot
    y; //Y Position of Center of Robot

    //Wheel Motion Planning
    wheelV = new Vector(); //x is left wheel velocity, y is right wheel velocity
    wheelA = new Vector();
    wheelJ = new Vector();

    dt = 0.1; //change in time / step

    t; //for tracking purposes

    CONSTRAINTS;
    SPLINE;
    PATH;

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

    calcForwardKinematics = () => {
        let omega = this.getOmega();

        let ICC = this.getIcc()
        let transformMatrix = [[cos(omega * this.dt), -sin(omega*this.dt), 0], [sin(omega*this.dt), cos(omega * this.dt), 0], [0, 0, 1]]
        let changeMatrix = [[x - ICC[0]], [y - ICC[1]], [this.theta]]
        let ICCMatrix = [[ICC[0]], [ICC[1]], [omega*this.dt]]

        //[[x`], [y`], [theta`]] = transformMtrix*changeMatrix + ICCMatrix
        let dPosition = this.multiplyMatrices(transformMatrix, changeMatrix)
        dPosition = this.addColumnVectors(dPosition, ICCMatrix);
        return dPosition;
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


    //returns R from center to ICC
    getR = () => {
        let VL = wheelV.x;
        let VR = wheelV.y;

        return (WIDTH / 2) * (VL + VR)/(VR-VL)
    }


    //Returns angular velocity (?) about ICC / instantaneous center of rotation
    getOmega = () => {
        let VL = wheelV.x;
        let VR = wheelV.y;

        return (VR - VL) / WIDTH;
    }

    getICC = () => {
        let R = this.getR();
        let perpendicularVector = new Vector([1, -cos(theta) / sin(theta)])
        perpendicularVector = perpendicularVector.getToMagnitude(R);
        let ICCx = this.x + perpendicularVector.x;
        let ICCy = this.y + perpendicularVector.y;

        return new Vector([ICCx, ICCy])
    }

    //UTILITY FUNCTION I SHOULD MOVE TO ANOTHER CLASS

    multiplyMatrices = (m1, m2) => {
        var result = [];
        for (var i = 0; i < m1.length; i++) {
            result[i] = [];
            for (var j = 0; j < m2[0].length; j++) {
                var sum = 0;
                for (var k = 0; k < m1[0].length; k++) {
                    sum += m1[i][k] * m2[k][j];
                }
                result[i][j] = sum;
            }
        }
        return result;
    }

    addColumnVectors = (v1, v2) => {
        if (v1.length !== v2.length)
            return -1;
        
        let result = [];
        for (let i = 0; i < v1.length; i++) {
            result[i][0] = v1[i][0] + v2[i][0];
        }
    }
}