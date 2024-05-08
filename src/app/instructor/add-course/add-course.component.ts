import { Component } from '@angular/core';

import { CoursesService } from '../../services/courses-service/courses.service';
import { Course } from '../../models/Course';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent {
  constructor(private coursesService: CoursesService) { }

  year: number = 1;
  name: string = "";
  hours: number = 3;
  capacity: number = 100;

  addCourse() {
    this.coursesService.addCourse(new Course(this.name, "Khaled", this.hours, this.capacity, this.year));
  }
}
