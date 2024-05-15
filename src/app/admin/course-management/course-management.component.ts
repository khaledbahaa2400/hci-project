import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CourseManagementServiceService } from '../../course-management-service/course-management-service.service';
import { Course } from '../../models/Course';
import { Firestore, collectionData, docData } from '@angular/fire/firestore';
import { Observable, combineLatest, map, switchMap } from 'rxjs';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-course-management',
  templateUrl: './course-management.component.html',
  styleUrl: './course-management.component.css'
})
export class CourseManagementComponent {
  coureseSub:Subscription;
  Courses:Course[]=[];
  
  constructor(private courseService:CourseManagementServiceService){
     this.coureseSub=this.courseService.getCourses().subscribe((data)=>{
       this.Courses=data;
     })
}
  
}
