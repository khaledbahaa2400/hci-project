export class Course {
    name: string;
    instructor: string;
    hours: number;
    capacity: number;
    year: number;

    constructor(name: string, instructor: string, hours: number, capacity: number, year: number,) {
        this.name = name;
        this.instructor = instructor;
        this.hours = hours;
        this.capacity = capacity;
        this.year = year;
    }
}