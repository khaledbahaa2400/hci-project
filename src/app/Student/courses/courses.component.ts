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
  userSub: Subscription;
  users: User[] = [];
  courses: string[] = [];
  progress: { [key: string]: number } = {};

  constructor(private coursesServices: CoursesService, private router: Router, private authService: AuthService) {
    this.coureseSub = this.coursesServices.getCourses().subscribe((courses) => {
      this.Courses = courses;
      this.calculateProgress();
    })
    this.userSub = this.coursesServices.getUser().subscribe((user) => {
      this.users = user;
      const useremail = JSON.parse(localStorage.getItem("user") || "{}");
      this.usercourses(useremail.email);
    })
  }

  usercourses(useremail: String) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].email === useremail) {
        for (let j = 0; j < this.users[i].courses.length; j++) {
          this.courses[j] = this.getCourseName(this.Courses[j].id);
          console.log(this.courses);
        }
      }
    }
  }

  async calculateProgress() {
    this.progress = {};
    let done: { [key: string]: number } = {};
    let notDone: { [key: string]: number } = {};

    const user = this.authService.getCurrentUser()
    if (user) {
      if (!(user.id in done)) {
        done[user.id] = 0;
        notDone[user.id] = 0;
      }

      this.Courses.forEach(course => {
        course.materials.forEach(material => {
          if (material.isDone[user.id])
            done[user.id]++;
          else
            notDone[user.id]++;
        });

        const progress = done[user.id] / (done[user.id] + notDone[user.id]) * 100
        console.log(course.name, progress)
        this.progress[course.name] = progress
      });
    }
  }

  getCourseName(id: string): string {
    const course: Course | undefined = this.Courses.find(c => c.id === id);
    return course ? course.name : ""; // If course is found, return its name, otherwise return an empty string
  }

  courseDetails(courseName: String) {
    this.router.navigate(['student/course-details', courseName]);
  }
}
