import { Component } from '@angular/core';
import { Firestore, collectionData, docData } from '@angular/fire/firestore';
import { Observable, Subscription, combineLatest, map, switchMap } from 'rxjs';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { CourseRegistration } from '../../models/CourseRegistration';
import { AssignService } from '../../assign-course-to-student/assign.service';

@Component({
  selector: 'app-assign-student-to-course',
  templateUrl: './assign-student-to-course.component.html',
  styleUrl: './assign-student-to-course.component.css'
})
export class AssignStudentToCourseComponent {

  regSub: Subscription;
  reg: CourseRegistration[] = [];

  constructor(private Assign: AssignService) {
    this.regSub = this.Assign.getCoursesreg().subscribe((data) => {
      this.reg = data;
    })
  }
}
