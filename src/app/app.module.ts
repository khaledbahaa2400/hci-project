import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { AdminDashboaredComponent } from './admin-dashboared/admin-dashboared.component';
import { AssignStudentToCourseComponent } from './assign-student-to-course/assign-student-to-course.component';
import { CourseManagementComponent } from './course-management/course-management.component';
import { UsersComponent } from './users/users.component';


import { AddAssessmentComponent } from './instructor/add-assessment/add-assessment.component';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InstructorHeaderComponent } from './instructor/shared/instructor-header/instructor-header.component';
import { AddCourseComponent } from './instructor/add-course/add-course.component';
import { InstructorCoursesComponent } from './instructor/instructor-courses/instructor-courses.component';
import { StudentsProgressComponent } from './instructor/students-progress/students-progress.component';
import { UploadGradesComponent } from './instructor/upload-grades/upload-grades.component';
import { CourseRegisterationComponent } from './Student/course-registeration/course-registeration.component';
import { CoursesComponent } from './Student/courses/courses.component';
import { GradesComponent } from './Student/grades/grades.component';
import { CourseDetailsComponent } from './Student/course-details/course-details.component';
import { HeaderComponent } from './Student/header/header.component';
import { SignUpComponent } from './Registeration/sign-up/sign-up.component';
import { LogInComponent } from './Registeration/log-in/log-in.component';
import { RegHeaderComponent } from './Registeration/reg-header/reg-header.component';

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
    HeaderComponent,
    SignUpComponent,
    LogInComponent,
    RegHeaderComponent
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    FormsModule,
    CommonModule
  ],
  providers: [
    provideClientHydration()

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
