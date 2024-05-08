import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CoursesService } from '../../services/courses-service/courses.service';
import { Course } from '../../models/Course';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent {
  reactiveFormGroup: FormGroup;
  year: number = 1;

  constructor(private coursesService: CoursesService) {
    this.reactiveFormGroup = new FormGroup({
      name: new FormControl("", Validators.required),
      hours: new FormControl(3, [Validators.required, Validators.min(1)]),
      capacity: new FormControl(100, [Validators.required, Validators.min(100)])
    })
  }

  addCourse() {
    this.coursesService.addCourse(new Course(this.reactiveFormGroup.value.name, "Khaled", this.reactiveFormGroup.value.hours, this.reactiveFormGroup.value.capacity, this.year));
  }
}
