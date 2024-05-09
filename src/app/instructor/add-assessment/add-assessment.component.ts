import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  reactiveFormGroup: FormGroup;
  yearCourses: Course[];

  constructor(private coursesService: CoursesService, private assessmentService: AssessmentsService) {
    this.reactiveFormGroup = new FormGroup({
      year: new FormControl(1, Validators.required),
      course: new FormControl("", Validators.required),
      mode: new FormControl("online", Validators.required),
      type: new FormControl("midterm", Validators.required),
      date: new FormControl("", Validators.required)
    })
    this.yearCourses = this.coursesService.filterCoursesByYear(this.reactiveFormGroup.value.year, "Khaled");
    this.reactiveFormGroup.get('course')?.setValue(this.yearCourses[0]);
  }

  filterCoursesByYear(): void {
    this.yearCourses = this.coursesService.filterCoursesByYear(this.reactiveFormGroup.value.year, "Khaled");
    this.reactiveFormGroup.value.course = this.yearCourses[0];
  }

  uploadAssessment(): void {
    let name = this.reactiveFormGroup.value.course.name + '-' + this.reactiveFormGroup.value.type + '-' + this.reactiveFormGroup.value.date;
    this.assessmentService.addAssessment(new Assessment(
      this.reactiveFormGroup.value.year, name, this.reactiveFormGroup.value.course,
      this.reactiveFormGroup.value.mode, this.reactiveFormGroup.value.type, this.reactiveFormGroup.value.date));
  }
}
