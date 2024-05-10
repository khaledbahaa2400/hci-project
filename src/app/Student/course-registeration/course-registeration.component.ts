import { Component } from '@angular/core';
import { CourseRegistration } from '../../models/CourseRegistration';
import { CoursesService } from '../../services/courses-service/courses.service';
import { Course } from '../../models/Course';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-course-registeration',
  templateUrl: './course-registeration.component.html',
  styleUrl: './course-registeration.component.css'
})
export class CourseRegisterationComponent {
  coureseSub:Subscription;
  Courses:Course[]=[];
  coureseRegSub:Subscription;
  CoursesReg:CourseRegistration[]=[];
  total:number=0;
  
  constructor(private coursesServices:CoursesService){
     this.coureseSub=this.coursesServices.getCourses().subscribe((courses)=>{
       this.Courses=courses;
     })
     this.coureseRegSub=this.coursesServices.getcoursesReg().subscribe((courses)=>{
      this.CoursesReg=courses;
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      this.copyCourses(user.email)
    })
   
   
   
    
  } 
  
  copyCourses(email:string){
    let x=0;
   
         for(let i=0;i<this.Courses.length;i++){
          console.log("add new course")
          for(let j=0;j<this.CoursesReg.length;j++){
            if(this.Courses[i].name===this.CoursesReg[j].course_name){
              
              x=1;
              break;
            }
          }
          if(x===0){
            
             this.CoursesReg.push({
              course_name: this.Courses[i].name,
              student_email:email, 
              hours: this.Courses[i].hours,
              year: this.Courses[i].year,
              isSelected: false,
              id:""
             })
             
             this.coursesServices.updatedatabase({
              course_name: this.Courses[i].name,
              student_email:email, 
              hours: this.Courses[i].hours,
              year: this.Courses[i].year,
              isSelected: false,
              id:""
                  },"add")
          }
          x=0;
        }
  }
  totalhours(){
    let total=0;
    for(let j=0;j<this.CoursesReg.length;j++){
      if(this.CoursesReg[j].isSelected===true)
        total+=this.CoursesReg[j].hours;
    }
    return total;
  }

  toggleSelection(c:CourseRegistration) {
    this.CoursesReg[this.CoursesReg.indexOf(c)].isSelected=!this.CoursesReg[this.CoursesReg.indexOf(c)].isSelected;
    this.coursesServices.updatedatabase(c,"update");
    this.total=this.totalhours();
  }
  saveChanges(){}
  ngOnDestroy(){
    this.coureseRegSub.unsubscribe();
    this.coureseSub.unsubscribe();
  }
}
