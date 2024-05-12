import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Firestore, addDoc, collection, collectionData, doc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Assessment } from '../../models/Assessment';
import { CoursesService } from '../courses-service/courses.service';

@Injectable({
  providedIn: 'root'
})
export class AssessmentsService {
  constructor(private coursesService: CoursesService, private firestore: Firestore, private toastr: ToastrService) { }

  getAssessments(): Observable<Assessment[]> {
    const assessments = collectionData(collection(this.firestore, 'assessments'), { idField: 'id' })
    return assessments as Observable<Assessment[]>;
  }

  addAssessment(assessment: Assessment) {
    addDoc(collection(this.firestore, 'assessments'), { ...assessment });
  }

  updateAssessment(assessment: Assessment) {
    const ref = doc(this.firestore, 'assessments', assessment.id);
    updateDoc(ref, { ...assessment });
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
