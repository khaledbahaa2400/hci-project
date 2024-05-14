
import { Injectable } from '@angular/core';
import { Firestore, collectionData, docData } from '@angular/fire/firestore';
import { Observable, combineLatest, map, switchMap } from 'rxjs';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { Course } from '../models/Course';

@Injectable({
  providedIn: 'root'
})
export class CourseManagementServiceService {

  

  constructor(private fireStore: Firestore){}

  getCourses(): Observable<Course[]> {
    const courses = collectionData(collection(this.fireStore, 'courses'), { idField: 'id' })
    return courses as Observable<Course[]>;
  }
}
