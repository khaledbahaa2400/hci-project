import { Injectable } from '@angular/core';

import { Student } from '../../models/Student';
import { CoursesService } from '../courses-service/courses.service';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  constructor(private coursesService: CoursesService) { }

  students: Student[] = [
    new Student("Khaled", "20191700222", 4),
    new Student("Hamdy", "20191700218", 4),
    new Student("Ahmed", "20201700222", 3),
    new Student("Mohamed", "20211700222", 2),
    new Student("Amr", "20231700222", 1),
  ];

  studentsProgress = [
    { "student": this.students[0], "course": this.coursesService.courses[0], "progress": "75%" },
    { "student": this.students[0], "course": this.coursesService.courses[1], "progress": "65%" },
    { "student": this.students[0], "course": this.coursesService.courses[2], "progress": "50%" },
    { "student": this.students[1], "course": this.coursesService.courses[0], "progress": "85%" },
    { "student": this.students[1], "course": this.coursesService.courses[1], "progress": "60%" },
    { "student": this.students[1], "course": this.coursesService.courses[2], "progress": "70%" },
    { "student": this.students[2], "course": this.coursesService.courses[3], "progress": "35%" },
    { "student": this.students[3], "course": this.coursesService.courses[4], "progress": "90%" },
    { "student": this.students[4], "course": this.coursesService.courses[5], "progress": "100%" },
  ];

  filterProgressByCourse(course: string) {
    return this.studentsProgress.filter(obj => obj.course.name === course);
  }
}
