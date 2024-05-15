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
      console.log("courses"+courses.length)
      this.user = JSON.parse(localStorage.getItem("user") || "{}");
      this.copyCourses(this.user.email)
    })
    this.coureseRegSub = this.coursesServices.getcoursesReg().subscribe((courses) => {
      this.CoursesReg = courses;
      console.log(this.user)
      console.log("courses"+this.CoursesReg.length)
      this.totalHours = this.totalhours();
    })




  }
  copyCourses(email: string) {
    // let x = false;
    // this.Courses.forEach(element => {
    //   x=this.CoursesReg.some((c)=>{
    //     return element.name === c.course_name && email === c.student_email;
    //   })
    //   if (x === false) {
    //     this.coursesServices.updateRegisterationRequests({
    //       course_name: element.name,
    //       student_email: email,
    //       hours: element.hours,
    //       year: element.year,
    //       isSelected: false,
    //       id: ""
    //     }, "add")
    //     console.log("course added")
    //   }
    //   x = false;
    // }); 
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
