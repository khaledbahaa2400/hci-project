import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, updateDoc } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

import { Course } from '../../models/Course';
import { CourseRegistration } from '../../models/CourseRegistration';
import { User } from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  constructor(private firestore: Firestore, private toastr: ToastrService) { }

  getCourses(): Observable<Course[]> {
    const courses = collectionData(collection(this.firestore, 'courses'), { idField: 'id' })
    return courses as Observable<Course[]>;
  }

  addCourse(course: Course) {
    addDoc(collection(this.firestore, 'courses'), { ...course });
  }

  updateCourse(course: Course) {
    const ref = doc(this.firestore, 'courses', course.id);
    updateDoc(ref, { ...course });
  }

  addMaterial(course: Course) {
    const ref = doc(this.firestore, 'courses', course.id);
    updateDoc(ref, { ...course });
  }

  showSuccess(message: string) {
    this.toastr.success(message, 'Success', {
      timeOut: 3000, // toast timeout in milliseconds (default is 3000)
      progressBar: true, // show progress bar
      positionClass: 'toast-top-right' // toast position
    });
  }
  

  showError(message: string) {
    this.toastr.error(message, 'Error', {
      timeOut: 3000, // toast timeout in milliseconds (default is 3000)
      progressBar: true, // show progress bar
      positionClass: 'toast-top-right' // toast position
    });
  }

  getcoursesReg(): Observable<CourseRegistration[]> {
    const CourseRegistrationCollection = collection(this.firestore, 'course-registration')
    const CoursesReg = collectionData(CourseRegistrationCollection, { idField: 'id' }) as Observable<CourseRegistration[]>;
    return CoursesReg;
  }

  updatedatabase(course: CourseRegistration, s: any) {

    const CourseRegistrationCollection = collection(this.firestore, 'course-registration')

    if (s === "add") {

      addDoc(CourseRegistrationCollection, { ...course });
    } else {
      const document = doc(CourseRegistrationCollection, course.id);
      updateDoc(document, { ...course });
    }
  }

  updatedatabasee(course: Course, s: any) {

    const CourseCollection = collection(this.firestore, 'courses')
      const document = doc(CourseCollection, course.id);
      updateDoc(document, { ...course });
    }

  getUser():Observable<User[]>{
    const userCollection = collection(this.firestore, 'users')
    const users = collectionData(userCollection, { idField: 'id' }) as Observable<User[]>;
    return users ;
  }

  
}
