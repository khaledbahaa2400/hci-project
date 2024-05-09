import { Component } from '@angular/core';

import { Course } from '../../models/Course';
import { CoursesService } from '../../services/courses-service/courses.service';
import { StudentsService } from '../../services/students-service/students.service';

@Component({
  selector: 'app-students-progress',
  templateUrl: './students-progress.component.html',
  styleUrl: './students-progress.component.css'
})
export class StudentsProgressComponent {
  constructor(private coursesService: CoursesService, private studentsService: StudentsService) { }

  instructorCourses: Course[] = this.coursesService.filterCoursesByInstructor("Khaled");

  course = this.instructorCourses[0].name;
  courseProgress = this.studentsService.filterProgressByCourse(this.course);

  filterProgressByCourse() {
    this.courseProgress = this.studentsService.filterProgressByCourse(this.course);
  }
}
