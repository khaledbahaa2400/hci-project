import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminDashboaredComponent } from './admin/admin-dashboared/admin-dashboared.component';
import { AssignStudentToCourseComponent } from './admin/assign-student-to-course/assign-student-to-course.component';
import { CourseManagementComponent } from './admin/course-management/course-management.component';
import { UsersComponent } from './admin/users/users.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { InstructorHeaderComponent } from './instructor/shared/instructor-header/instructor-header.component';
import { AddCourseComponent } from './instructor/add-course/add-course.component';
import { InstructorCoursesComponent } from './instructor/instructor-courses/instructor-courses.component';
import { StudentsProgressComponent } from './instructor/students-progress/students-progress.component';
import { UploadMaterialsComponent } from './instructor/upload-materials/upload-materials.component';
import { UploadGradesComponent } from './instructor/upload-grades/upload-grades.component';
import { CourseRegisterationComponent } from './Student/course-registeration/course-registeration.component';
import { CoursesComponent } from './Student/courses/courses.component';
import { GradesComponent } from './Student/grades/grades.component';
import { CourseDetailsComponent } from './Student/course-details/course-details.component';
import { SignUpComponent } from './Registeration/sign-up/sign-up.component';
import { LogInComponent } from './Registeration/log-in/log-in.component';
import { RegHeaderComponent } from './Registeration/reg-header/reg-header.component';
import { InstructorComponent } from './instructor/instructor/instructor.component';
import { StudentComponent } from './Student/student/student.component';
import { StudentHeaderComponent } from './Student/student-header/student-header.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { AdminComponent } from './admin/admin/admin.component';
import { environment } from '../environments/environment.development';


@NgModule({
  declarations: [
    AppComponent,
    AdminDashboaredComponent,
    AssignStudentToCourseComponent,
    CourseManagementComponent,
    UsersComponent,
    InstructorHeaderComponent,
    AddCourseComponent,
    InstructorCoursesComponent,
    StudentsProgressComponent,
    UploadMaterialsComponent,
    UploadGradesComponent,
    CourseRegisterationComponent,
    CoursesComponent,
    GradesComponent,
    CourseDetailsComponent,
    SignUpComponent,
    LogInComponent,
    RegHeaderComponent,
    InstructorComponent,
    StudentComponent,
    StudentHeaderComponent,
    UnauthorizedComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    provideFirebaseApp(() => initializeApp({ "projectId": "hci-project-8147a", "appId": "1:1010784811225:web:f17d9b998c6c0e2962e6c8", "storageBucket": "hci-project-8147a.appspot.com", "apiKey": "AIzaSyAuVyNl2S7IMfe0D_PpkLhuEI94_AUv59Y", "authDomain": "hci-project-8147a.firebaseapp.com", "messagingSenderId": "1010784811225" })),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
