import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { Course } from '../../models/Course';
import { CoursesService } from '../../services/courses-service/courses.service';
import { AuthService } from '../../services/auth-service/auth.service';
import { StudentProgress } from '../../models/StudentProgress';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-students-progress',
  templateUrl: './students-progress.component.html',
  styleUrl: './students-progress.component.css'
})
export class StudentsProgressComponent {
  courses: Course[] = [];
  coursesSubscription: Subscription;
  instructorCourses: Course[] = [];
  course?: Course;
  courseName: string = "";
  courseProgress: StudentProgress[] = [];

  constructor(private coursesService: CoursesService, private authService: AuthService, private firestore: Firestore) {
    this.coursesSubscription = this.coursesService.getCourses().subscribe((courses) => {
      this.courses = courses;
      this.filterCoursesByInstructor();
      this.calculateStudentsProgress();
    })
  }

  ngOnDestroy() {
    this.coursesSubscription.unsubscribe();
  }

  filterCoursesByInstructor(): void {
    const currentUser = this.authService.getCurrentUser();
    this.instructorCourses = this.courses.filter(course => course.instructor == currentUser?.username && !course.isArchived);
    this.course = this.instructorCourses[0];
    this.courseName = this.instructorCourses[0].name;
  }

  async calculateStudentsProgress() {
    this.courseProgress = [];
    this.course = this.courses.find(obj => obj.name == this.courseName);

    let done: { [key: string]: number } = {};
    let notDone: { [key: string]: number } = {};
    this.course?.materials.forEach(material => {
      const studentsIDs = Object.keys(material.isDone);
      studentsIDs.forEach(id => {
        if (!(id in done)) {
          done[id] = 0;
          notDone[id] = 0;
        }

        if (material.isDone[id])
          done[id]++;
        else
          notDone[id]++;
      });
    });

    for (const studentID of Object.keys(done)) {
      const ref = doc(this.firestore, 'users', studentID);
      const docSnapshot = await getDoc(ref);
      const data = docSnapshot.data()

      if (data) {
        const student = { 'name': data['username'], 'id': data['id'] };
        const progress = done[studentID] / (done[studentID] + notDone[studentID]) * 100
        this.courseProgress.push(new StudentProgress("", student, this.course, progress + "%"))
      }
    }
  }
}
