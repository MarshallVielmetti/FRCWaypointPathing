function Splines(waypoints) {
    this.wp = waypoints; // waypoints

    this.valuePairs = [];
    this.isCharted = false;

    //graph waypoints
    this.graph = function() {
        if (this.isCharted) {
            strokeWeight(2)
            stroke('green')
            for(let i = 0; i < this.valuePairs.length - 1; i++) {
                line(this.valuePairs[i][0], this.valuePairs[i][1], this.valuePairs[i+1][0], this.valuePairs[i+1][1])
            }
        }
    }

    this.concatSplines = function() {
        let newPairs = [];
        for (let i = 0; i < waypoints.length-1; i++) {
            //loop the # of waypoints - 1 times.
            let newVals = hermiteSplines(this.wp[i], this.wp[i+1])
            newPairs = newPairs.concat(newVals);
        }
        this.isCharted = true;
        this.valuePairs = newPairs;
    }

    hermiteSplines = function(wp1, wp2) {
        //calculates splines from two waypoints
        //returns 100 element array - 0-100 taking place of 0-1 so results can be better stored in arrays.

        let p0 = wp1.getPosVector();
        let m0 = wp1.getVelVector();
        let p1 = wp2.getPosVector();
        let m1 = wp2.getVelVector();

        let P = []

        for (let i = 0; i < 100; i++) {
            let t = i / 100;
            let newVals = []
            for (let d = 0; d < 2; d++) {
                //loop through both dimensions of the array (no vector ops in JS)
                newVals[d] = (2*t**3 - 3*t**2 + 1)*p0[d] + (t**3 - 2*t**2 + t)*m0[d] + (-2*t**3 + 3*t**2)*p1[d] + (t**3 - t**2)*m1[d]
            }
            P[i] = newVals;
        }
        return P;

    }

    catmullRom = function() {

    }

    this.exportPathing = (fileName) => {
        let header = ["X", "Y"].join(",") + "\n";
        let csv = header;


        this.valuePairs.forEach( pair  => {
            csv += pair[0].toFixed(3) + "," + pair[1].toFixed(3) + "\n";
        })

        let csvData = new Blob([csv], { type: 'text/csv' }); 
        let csvUrl = URL.createObjectURL(csvData);
        let hiddenElement = document.createElement('a');
        hiddenElement.href = csvUrl;
        hiddenElement.target = '_blank';
        hiddenElement.download = fileName + '.csv';

        hiddenElement.click();
 
    }

    this.getValuePairs = function() {
        return this.valuePairs;
    }

    this.getSplineLength = () => {
        return motionUtil.getSplineLength(this.valuePairs)
    }
}