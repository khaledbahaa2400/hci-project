import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { InstructorHeaderComponent } from './instructor/shared/instructor-header/instructor-header.component';
import { AddAssessmentComponent } from './instructor/add-assessment/add-assessment.component';
import { AddCourseComponent } from './instructor/add-course/add-course.component';
import { InstructorCoursesComponent } from './instructor/instructor-courses/instructor-courses.component';
import { StudentsProgressComponent } from './instructor/students-progress/students-progress.component';
import { UploadGradesComponent } from './instructor/upload-grades/upload-grades.component';

@NgModule({
  declarations: [
    AppComponent,
    AddAssessmentComponent,
    InstructorHeaderComponent,
    AddCourseComponent,
    InstructorCoursesComponent,
    StudentsProgressComponent,
    UploadGradesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
