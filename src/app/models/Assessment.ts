export class Assessment {
    id: string
    name: string;
    course: string;
    instructor: string
    year: number;
    week: number;
    grades: { [key: string]: number };

    constructor(id: string, name: string, course: string, instructor: string, year: number, week: number, grades: { [key: string]: number }) {
        this.id = id;
        this.name = name;
        this.course = course;
        this.instructor = instructor;
        this.year = year;
        this.week = week;
        this.grades = grades;
    }
}