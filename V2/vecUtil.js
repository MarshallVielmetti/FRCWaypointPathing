class Vector {
    x;
    y;

    // constructor(x, y) {
    //     this.x = x;
    //     this.y = y;
    // }

    constructor([x, y]) {
        this.x = x;
        this.y = y;
    }

    // constructor() {
    //     this.x = 0;
    //     this.y = 0;
    // }

    // constructor(other) {
    //     this.x = other.x;
    //     this.y = othery.y;
    // }

    set = ([x, y]) => {
        this.x = x;
        this.y = y;
    }

    getMagnitude = () => {
        return Math.sqrt(this.x**2 + this.y**2)
    }

    getNormal = () => {
        return new Vector(this.x / this.getMagnitude(), this.y / this.getMagnitude())
    }

    getToMagnitude = (magnitude) => {
        let normed = this.getNormal();
        return new Vector(normed.getScaled(magnitude))
    }

    getScaled = (factor) => {
        return new Vector(this.x*factor, this.y*factor)
    }
    
    /*
    static normalizeVector = (vector) => {
        let mag = vecUtil.getMagnitude(vector)
        return vector.map(val => val / mag)
    }
    

    static scaleToMagnitude = (vector, magnitude) => {
        let norm = vecUtil.normalizeVector(vector)
        let scaledVec = norm.map(val => val*magnitude);
        return scaledVec;
    }
    

    static getMagnitude = (vector) => {
        return Math.sqrt(vector[0]**2 + vector[1]**2)
    }
    */

    static translateVec = (vector, shift) => {
    return [vector[0] + shift[0], vector[1] + shift[1]];
    }

    static invertVec = (vector) => {
        return [-vector[1], vector[0]]
    }

    static scaleVec = (vector, scaler) => {
        return vector.map(val => val*scaler)
    }

    static addVec = (vec1, vec2) => {
        return [vec1[0] + vec2[0], vec1[1] + vec2[1]]
    }

    static subtractVec = (vec1, vec2) => {
        return [vec1[0] - vec2[0], vec1[1] - vec2[1]]
    }

    static vecToLine = (origin, vec) => {
        line(origin[0], origin[1], origin[0] + vec[0], origin[1] + vec[1])
    }

    static getAngle = (vec) => {
        //gets angle of vector 1 WRT origin
        //four cases based on quadrant
        return vecUtil.getAngle(vec, new Vector([1, 0]))
    }

    static getAngle  = (vec1, vec2) => {
        //returns angle between vector 1 and vector 2
        return acos(vecUtil.dotProduct(vec1, vec2) / (vec1.getMagnitude() * vec2.getMagnitude()))
    }

    static dotProduct = (vec1, vec2) => {
        return vec11.x*vec2.x + vec1.y*vec2.y
    }
}