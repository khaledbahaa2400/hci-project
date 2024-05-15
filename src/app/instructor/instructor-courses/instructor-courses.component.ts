import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Course } from '../../models/Course';
import { CoursesService } from '../../services/courses-service/courses.service';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-instructor-courses',
  templateUrl: './instructor-courses.component.html',
  styleUrl: './instructor-courses.component.css'
})
export class InstructorCoursesComponent {
  courses: Course[] = [];
  subscription: Subscription;
  year: number = 1;
  yearCourses: Course[] = [];
  showEditModal = false;
  reactiveFormGroup: FormGroup;
  updatedCourse: Course;

  constructor(private coursesService: CoursesService, private authService: AuthService) {
    this.reactiveFormGroup = new FormGroup({
      name: new FormControl("", Validators.required),
      hours: new FormControl(3, [Validators.required, Validators.min(1)]),
      capacity: new FormControl(100, [Validators.required, Validators.min(100)])
    })

    this.subscription = this.coursesService.getCourses().subscribe((courses) => {
      this.courses = courses;
      this.filterCoursesByYear();
    })

    this.updatedCourse = this.courses[0];
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filterCoursesByYear(): void {
    const currentUser = this.authService.getCurrentUser();
    this.yearCourses = this.courses.filter(course => course.year == this.year && course.instructor == currentUser?.username && !course.isArchived);
  }

  editCourse(course: Course) {
    this.showEditModal = true;
    this.reactiveFormGroup.get('name')?.setValue(course.name);
    this.reactiveFormGroup.get('hours')?.setValue(course.hours);
    this.reactiveFormGroup.get('capacity')?.setValue(course.capacity);
    this.updatedCourse = course;
  }

  updateCourse() {
    this.updatedCourse.name = this.reactiveFormGroup.value.name;
    this.updatedCourse.hours = this.reactiveFormGroup.value.hours;
    this.updatedCourse.capacity = this.reactiveFormGroup.value.capacity;
    this.coursesService.updateCourse(this.updatedCourse)
    this.coursesService.showSuccess("Course Updated Successfully")
    this.reactiveFormGroup.reset({
      name: "",
      hours: 3,
      capacity: 100,
    });
  }
}
