import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Route, RouterModule, Routes } from '@angular/router';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AdminDashboaredComponent } from './admin/admin-dashboared/admin-dashboared.component';
import { AssignStudentToCourseComponent } from './admin/assign-student-to-course/assign-student-to-course.component';
import { CourseManagementComponent } from './admin/course-management/course-management.component';
import { UsersComponent } from './admin/users/users.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InstructorHeaderComponent } from './instructor/shared/instructor-header/instructor-header.component';
import { AddAssessmentComponent } from './instructor/add-assessment/add-assessment.component';
import { AddCourseComponent } from './instructor/add-course/add-course.component';
import { InstructorCoursesComponent } from './instructor/instructor-courses/instructor-courses.component';
import { StudentsProgressComponent } from './instructor/students-progress/students-progress.component';
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
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AdminComponent } from './admin/admin/admin.component';


const routes: Routes = [
  {path: 'Users', component:UsersComponent},
  {path: 'Courses', component:CourseManagementComponent},
  {path: 'Assigncourses', component:AssignStudentToCourseComponent},
  {path: 'Logout', component:LogInComponent},
  {path: 'Courseregisteration', component:CourseRegisterationComponent},
  {path: 'Grades', component:GradesComponent},
  {path: 'Admin-dashboard', component:AdminDashboaredComponent}
  


]


@NgModule({
  declarations: [
    AppComponent,
    AdminDashboaredComponent,
    AssignStudentToCourseComponent,
    CourseManagementComponent,
    UsersComponent,
    AddAssessmentComponent,
    InstructorHeaderComponent,
    AddCourseComponent,
    InstructorCoursesComponent,
    StudentsProgressComponent,
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
    RouterModule.forRoot(routes),
    provideFirebaseApp(() => initializeApp({ "projectId": "hci-project-8147a", "appId": "1:1010784811225:web:f17d9b998c6c0e2962e6c8", "storageBucket": "hci-project-8147a.appspot.com", "apiKey": "AIzaSyAuVyNl2S7IMfe0D_PpkLhuEI94_AUv59Y", "authDomain": "hci-project-8147a.firebaseapp.com", "messagingSenderId": "1010784811225" })),
    provideFirestore(() => getFirestore()),
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
