class HospitalVm {
    constructor(name, distance, waitTime, note, type, city, phone, address, website, availability, age, services) {
        this.name = name;
        this.distance = distance;
        this.waitTime = waitTime;
        this.note = note;
        this.type = type;
        this.city = city;
        this.phone = phone;
        this.address = address;
        this.website = website;
        this.availability = availability;``
        this.age = age;
        this.services = services;
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
}

module.exports = HospitalVm;
