import { Component } from '@angular/core';

import { Course } from '../../models/Course';
import { CoursesService } from '../../services/courses-service/courses.service';
import { AssessmentsService } from '../../services/assessments-service/assessments.service';
import { Assessment } from '../../models/Assessment';

@Component({
  selector: 'app-add-assessment',
  templateUrl: './add-assessment.component.html',
  styleUrl: './add-assessment.component.css'
})
export class AddAssessmentComponent {
  constructor(private coursesService: CoursesService, private assessmentService: AssessmentsService) { }

  year: number = 1;
  yearCourses: Course[] = this.coursesService.filterCoursesByYear(this.year, "Khaled");
  course: Course = this.yearCourses[0];
  mode: string = "online";
  type: string = "midterm";
  date: string = "";

  filterCoursesByYear(): void {
    this.yearCourses = this.coursesService.filterCoursesByYear(this.year, "Khaled");
    this.course = this.yearCourses[0];
  }

  uploadAssessment(): void {
    let name = this.course.name + '-' + this.type + '-' + this.date;
    this.assessmentService.addAssessment(new Assessment(this.year, name, this.course, this.mode, this.type, this.date));
  }
}
