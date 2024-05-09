import { Component } from '@angular/core';

import { Course } from '../../models/Course';
import { CoursesService } from '../../services/courses-service/courses.service';

@Component({
  selector: 'app-instructor-courses',
  templateUrl: './instructor-courses.component.html',
  styleUrl: './instructor-courses.component.css'
})
export class InstructorCoursesComponent {
  constructor(private coursesService: CoursesService) { }

  year: number = 1;
  yearCourses: Course[] = this.coursesService.filterCoursesByYear(this.year, "Khaled");

  filterCoursesByYear(): void {
    this.yearCourses = this.coursesService.filterCoursesByYear(this.year, "Khaled");
  }
}
