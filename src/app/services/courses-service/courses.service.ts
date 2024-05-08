import { Injectable } from '@angular/core';
import { Course } from '../../models/Course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  courses: Course[] = [
    new Course('HCI', 'Khaled', 3, 500, 4),
    new Course('social', 'Khaled', 3, 500, 4),
    new Course('SQA', 'Hamdy', 3, 500, 4),
    new Course('MM', 'Jana', 3, 500, 3),
    new Course('database', 'Nada', 3, 500, 2),
    new Course('intro', 'Khaled', 3, 500, 1),
  ];

  addCourse(course: Course) {
    this.courses.push(course);
  }

  filterCoursesByYear(year: number, instructor: string): Course[] {
    return this.courses.filter(course => course.year === year && course.instructor === instructor);
  }

  filterCoursesByInstructor(instructor: string): Course[] {
    return this.courses.filter(course => course.instructor === instructor);
  }
}
