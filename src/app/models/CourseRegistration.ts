export class CourseRegistration {
    course_name: string;
    student_email: string;
    hours: number;
    year: number;
    isSelected: boolean;
    id:string;

    constructor(course_name: string, student_email: string, hours: number, year: number) {
        this.course_name=course_name;
        this.student_email = student_email;
        this.hours = hours;
        this.year = year;
        this.isSelected = false;
        this.id=""
    }
}