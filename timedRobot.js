// a class used to simulate driving a robot over a given spline using motion curves
class TimedRobot {
    constructor(width, height, tstep) {
        this.currentT = 0;
        this.tstep = tstep;

        this.width = width;
        this.height = height;

        this.spline;

        this.tta; //Time it should take for robot to accelerate to vmax
        this.vmax; //Maximum desired velocity while driving spline
    }

    updateRobot = () => {

    }

    drawRobot = () => {

    }


    initiateSplinetask = (spline, tta, vmax) => {
        this.spline = spline;

        this.tta = tta;
        this.vmax = vmax;

        this.currentT = 0;
    }

    resetRobot = () => {
        this.currentT = 0;
        this.spline = null;
        this.tta = null
        this.vmax = null;
    }
}