import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CourseManagementServiceService } from '../../course-management-service/course-management-service.service';
import { Course } from '../../models/Course';
import { Firestore, collectionData, docData } from '@angular/fire/firestore';
import { Observable, combineLatest, map, switchMap } from 'rxjs';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CoursesService } from '../../services/courses-service/courses.service';
import { CourseRegistration } from '../../models/CourseRegistration';
@Component({
  selector: 'app-course-management',
  templateUrl: './course-management.component.html',
  styleUrl: './course-management.component.css'
})
export class CourseManagementComponent {
  coureseSub:Subscription;
  Courses:Course[]=[];
  updatedCourse: Course ;
  showEditModal = false;
  reactiveFormGroup: FormGroup ;
  totalHours: any;
  
  
  constructor(private courseService:CoursesService){
     this.coureseSub=this.courseService.getCourses().subscribe((data)=>{
       this.Courses=data;
     })
     this.reactiveFormGroup = new FormGroup({
      name: new FormControl("", Validators.required),
      hours: new FormControl(3, [Validators.required, Validators.min(1)]),
      capacity: new FormControl(100, [Validators.required, Validators.min(100)])
    })

   

    this.updatedCourse = this.Courses[0];this.reactiveFormGroup = new FormGroup({
      name: new FormControl("", Validators.required),
      hours: new FormControl(3, [Validators.required, Validators.min(1)]),
      capacity: new FormControl(100, [Validators.required, Validators.min(100)])
    })

    

    this.updatedCourse = this.Courses[0];
}

selectedOption: number = 1; // Variable to store the selected option

  // Method to handle option selection
  onSelect(option: number) {
    this.selectedOption = option;
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
    this.courseService.updateCourse(this.updatedCourse)
    this.courseService.showSuccess("Course Updated Successfully")
    this.reactiveFormGroup.reset({
      name: "",
      hours: 3,
      capacity: 100,
    });
  }

  toggleSelection(c:Course) {
    this.courseService.updateCourse(c);
    console.log(c.isArchived);
    console.log(this.Courses[this.Courses.indexOf(c)]);
    
  }
  
}
