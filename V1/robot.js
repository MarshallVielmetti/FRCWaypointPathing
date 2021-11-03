function Robot(width, height) {
    this.w = width; //robot width
    this.h = height; //robot height

    this.x

    this.cornerPoints = [];

    this.drawRobot = function(curX, curY, nextX, nextY) {
        // function of current and next position
        let slopeVec = [nextX - curX, nextY -curY]
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

    this.animateRobot = function(valuePairs) {
        for (let i = 0; i < valuePairs.length; i++) {
            
        }
    }

    this.printRobot = () => {
        console.log("This")
    }

    this.clearRobot = () => {
        this.cornerPoints = []
    }
}