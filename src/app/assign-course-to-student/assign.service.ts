import { Injectable } from '@angular/core';
import { Firestore, collectionData, docData } from '@angular/fire/firestore';
import { Observable, combineLatest, map, switchMap } from 'rxjs';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { CourseRegistration } from '../models/CourseRegistration';

@Injectable({
  providedIn: 'root'
})
export class AssignService {
  
  


  constructor(private fireStore: Firestore){}

  getCoursesreg(): Observable<CourseRegistration[]> {
    const courses = collectionData(collection(this.fireStore, 'course-registration'), { idField: 'id' })
    return courses as Observable<CourseRegistration[]>;
  }

 
  
}
