import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Course } from '../../models/Course';
import { CoursesService } from '../../services/courses-service/courses.service';
import { User } from '../../models/User';
import { Router } from '@angular/router';
import { StudentProgress } from '../../models/StudentProgress';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})

export class CoursesComponent {
  coureseSub: Subscription;
  Courses: Course[] = [];
  user: User
  courses: Course[] = [];
  progress: { [key: string]: number } = {};

  constructor(private coursesServices: CoursesService, private router: Router, private authService: AuthService) {
    this.coureseSub = this.coursesServices.getCourses().subscribe((course) => {
      this.Courses = course;
      this.user = authService.getCurrentUser() ?? new User("", "", "", "", "", 0, true, [])
      this.usercourses();
      this.calculateProgress();
      console.log(this.user)
    })
    this.user = authService.getCurrentUser() ?? new User("", "", "", "", "", 0, true, [])
  }

  usercourses() {
    for (let j = 0; j < this.user.courses.length; j++) {
      this.courses.push(this.getCourseName(this.user.courses[j]));
      console.log(this.courses);
    }
  }

  async calculateProgress() {
    this.progress = {};
    let done: { [key: string]: number } = {};
    let notDone: { [key: string]: number } = {};

    const user = this.authService.getCurrentUser()
    console.log(user);
    if (user) {
      if (!(user.id in done)) {
        done[user.id] = 0;
        notDone[user.id] = 0;
      }

      console.log(this.courses)
      this.courses.forEach(course => {
        if (course.materials) {
          course.materials.forEach(material => {
            console.log(material)
            if (material.isDone[user.id])
              done[user.id]++;
            else
              notDone[user.id]++;

            const progress = done[user.id] / (done[user.id] + notDone[user.id]) * 100
            console.log(course.name, progress)
            this.progress[course.name] = progress
          });
        }
      });
    }
  }

  getCourseName(id: string): Course {
    const course: Course = this.Courses.find(c => c.id === id) ?? new Course("", "", "", 0, 0, 0, false, []);
    return course// If course is found, return its name, otherwise return an empty string
  }

  courseDetails(courseName: String) {
    this.router.navigate(['student/course-details', courseName]);
  }
}
