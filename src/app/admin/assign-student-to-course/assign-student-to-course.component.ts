import { Component } from '@angular/core';
import { Firestore, collectionData, docData } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { CourseRegistration } from '../../models/CourseRegistration';
import { AssignService } from '../../assign-course-to-student/assign.service';
import { CoursesService } from '../../services/courses-service/courses.service';
import { Course } from '../../models/Course';
import { AuthService } from '../../services/auth-service/auth.service';
import { StudentsService } from '../../services/students-service/students.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-assign-student-to-course',
  templateUrl: './assign-student-to-course.component.html',
  styleUrl: './assign-student-to-course.component.css'
})
export class AssignStudentToCourseComponent {
  regSub: Subscription;
  courseSub: Subscription;
  userSub: Subscription;
  reg: CourseRegistration[] = [];
  courses: Course[] = []
  users: User[] = []

  constructor(private Assign: AssignService, private coursesService: CoursesService, private authService: AuthService, private studentService: StudentsService) {
    this.regSub = this.Assign.getCoursesreg().subscribe((data) => {
      this.reg = data;
    })

    this.courseSub = this.coursesService.getCourses().subscribe((data) => {
      this.courses = data;
    })

    this.userSub = this.studentService.getUsers().subscribe((data) => {
      this.users = data;
    })
  }

  accept(request: CourseRegistration) {
    const user = this.users.find(user => user.email == request.student_email)
    if (user) {
      const course = this.courses.find(course => course.name == request.course_name)
      user?.courses.push(course?.id ?? "");
      this.studentService.updateUser(user);
      this.coursesService.deleteRegisterationRequest(request)
    }
  }

  reject(request: CourseRegistration) {
    this.coursesService.deleteRegisterationRequest(request)
  }
}
