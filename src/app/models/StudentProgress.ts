import { Course } from "./Course";
import { User } from "./User";

export class StudentProgress {
    id: string;
    student: { name: any; id: any; };
    course: Course | undefined;
    progress: string;

    constructor(id: string, student: { name: any; id: any; }, course: Course | undefined, progress: string) {
        this.id = id;
        this.student = student;
        this.course = course;
        this.progress = progress
    }
}