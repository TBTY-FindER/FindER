class HospitalVm {
    constructor(name, distance, time) {
        this.name = name;
        this.distance = distance;
        this.time = time;
    }

    // Getter and setter methods for name
    getName() {
        return this.name;
    }

    setName(newName) {
        this.name = newName;
    }

    // Getter and setter methods for distance
    getDistance() {
        return this.distance;
    }

    setDistance(newDistance) {
        this.distance = newDistance;
    }

    // Getter and setter methods for time
    getTime() {
        return this.time;
    }

    setTime(newTime) {
        this.time = newTime;
    }
}

module.exports = HospitalVm;
