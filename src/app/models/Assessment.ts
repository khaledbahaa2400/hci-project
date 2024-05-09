import { Course } from "./Course";

export class Assessment {
    year: number;
    name: string;
    course: Course
    mode: string;
    type: string;
    date: string;

    constructor(year: number, name: string, course: Course, mode: string, type: string, date: string) {
        this.year = year;
        this.name = name;
        this.course = course;
        this.mode = mode;
        this.type = type;
        this.date = date;
    }
}