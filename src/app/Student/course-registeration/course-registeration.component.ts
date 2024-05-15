import { Component } from '@angular/core';
import { CourseRegistration } from '../../models/CourseRegistration';
import { CoursesService } from '../../services/courses-service/courses.service';
import { Course } from '../../models/Course';
import { Subscription } from 'rxjs';
import { AssessmentsService } from '../../services/assessments-service/assessments.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-course-registeration',
  templateUrl: './course-registeration.component.html',
  styleUrl: './course-registeration.component.css'
})
export class CourseRegisterationComponent {
  coureseSub: Subscription;
  Courses: Course[] = [];
  coureseRegSub: Subscription;
  CoursesReg: CourseRegistration[] = [];
  totalHours: number = 0;
  user: any;
  constructor(private coursesServices: CoursesService, private assessmentsService: AssessmentsService) {
    this.coureseSub = this.coursesServices.getCourses().subscribe((courses) => {
      this.Courses = courses;
    })
    this.coureseRegSub = this.coursesServices.getcoursesReg().subscribe((courses) => {
      this.CoursesReg = courses;
      this.user = JSON.parse(localStorage.getItem("user") || "{}");
      console.log(this.user)
      this.copyCourses(this.user.email)
      this.totalHours = this.totalhours();
    })




  }
  copyCourses(email: string) {
    let x = 0;
    for (let i = 0; i < this.Courses.length; i++) {
      for (let j = 0; j < this.CoursesReg.length; j++) {
        if (this.Courses[i].name === this.CoursesReg[j].course_name && email === this.CoursesReg[j].student_email) {
          x = 1;
          break;
        }
      }
      if (x === 0) {
        this.CoursesReg.push({
          course_name: this.Courses[i].name,
          student_email: email,
          hours: this.Courses[i].hours,
          year: this.Courses[i].year,
          isSelected: false,
          id: ""
        })

        this.coursesServices.updateRegisterationRequests({
          course_name: this.Courses[i].name,
          student_email: email,
          hours: this.Courses[i].hours,
          year: this.Courses[i].year,
          isSelected: false,
          id: ""
        }, "add")
      }
      x = 0;
    }
  }
  totalhours() {
    let total = 0;
    for (let j = 0; j < this.CoursesReg.length; j++) {
      if (this.CoursesReg[j].isSelected === true)
        total += this.CoursesReg[j].hours;
    }
    console.log("total" + total);
    return total;
  }

  toggleSelection(c: CourseRegistration) {
    this.CoursesReg[this.CoursesReg.indexOf(c)].isSelected = !this.CoursesReg[this.CoursesReg.indexOf(c)].isSelected;
    this.coursesServices.updateRegisterationRequests(c, "update");
    this.totalHours = this.totalhours();
  }
  saveChanges() {
    this.assessmentsService.showSuccess('Registration has been saved pending confirmation from the academic advisor.')
  }
  ngOnDestroy() {
    this.coureseRegSub.unsubscribe();
    this.coureseSub.unsubscribe();
  }
}
