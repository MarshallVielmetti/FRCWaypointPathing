class vecUtil {
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
}