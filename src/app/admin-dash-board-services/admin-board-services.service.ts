import { Injectable } from '@angular/core';
import { Course } from '../models/Course';
import { Firestore, collectionData, docData } from '@angular/fire/firestore';
import { Observable, combineLatest, map, switchMap } from 'rxjs';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { User } from '../models/User';
import { json } from 'stream/consumers';


@Injectable({
  providedIn: 'root'
})
export class AdminBoardServicesService {

  constructor(private fireStore: Firestore){}

  getCourses():Observable<Course[]>{
    
    const coursesCollection=collection(this.fireStore,'courses') ;
    const Courses=collectionData(coursesCollection) as Observable<Course[]>;    
    return Courses;
  } 
  getUsers():Observable<User[]>{
    const CourseRegistrationCollection=collection(this.fireStore,'users')
    const CoursesReg=collectionData(CourseRegistrationCollection,{idField:'id'}) as Observable<User[]>;   
    return CoursesReg;
  }




}
