import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Course } from '../../models/Course';
import { CoursesService } from '../../services/courses-service/courses.service';
import { Material } from '../../models/Material';
import { User } from '../../models/User';
import { AuthService } from '../../services/auth-service/auth.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css',
  animations: [
    trigger('collapse', [
      state('open', style({ height: '*' })),
      state('closed', style({ height: 0, overflow: 'hidden' })),
      transition('open <=> closed', animate('300ms ease-in-out'))
    ])
  ]
})
export class CourseDetailsComponent {
  coureseSub: Subscription;
  Courses: Course[] = [];
  materials: Material[] = [];
  currentCourse: Course;
  isCollapsed: boolean[] = [];
  courseName: any;
  user: User;

  constructor(private coursesServices: CoursesService, private route: ActivatedRoute, private authService: AuthService, private storage: AngularFireStorage) {
    this.coureseSub = this.coursesServices.getCourses().subscribe((courses) => {
      this.Courses = courses;
      this.currentCourse = this.getCourseByName(this.courseName) ?? new Course("", "", "", 0, 0, 0, false, []);
      this.materials = this.currentCourse?.materials ?? [];

    })
    this.user = this.authService.getCurrentUser() ?? new User("", "", "", "", "", 4, true, []);
    this.currentCourse = this.getCourseByName(this.courseName) ?? new Course("", "", "", 0, 0, 0, false, []);
    for (let i = 0; i < 10; i++) {
      this.isCollapsed[i] = true;
    }
    for (let i = 0; i < 10; i++) {
      console.log(this.isCollapsed[i]);
    }
  }

  toggleCollapse(index: number) {
    this.isCollapsed[index] = !this.isCollapsed[index];
  }

  toggleDone() {
    this.coursesServices.updateCourse(this.currentCourse)
  }

  getCourseByName(name: string): Course | undefined {
    return this.Courses.find(course => course.name === name);
  }

  downloadFile(fileName: string) {
    const fileRef = this.storage.ref(`uploads/${fileName}`);
    fileRef.getDownloadURL().subscribe(downloadURL => {
      const anchor = document.createElement('a');
      anchor.href = downloadURL;
      anchor.download = fileName;
      anchor.click();
    });
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      // File is selected, you can do further processing here
      console.log("Selected file:", file);
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.courseName = params['courseName'];

    });
  }
}
