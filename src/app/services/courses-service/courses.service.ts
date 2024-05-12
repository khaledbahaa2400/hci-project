import { Injectable } from '@angular/core';
import { Course } from '../../models/Course';
import { Observable } from 'rxjs';
import { Firestore, addDoc, collection, collectionData, doc, updateDoc } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

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
}
