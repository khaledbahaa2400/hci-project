import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AdminDashboaredComponent } from './admin-dashboared/admin-dashboared.component';
import { AssignStudentToCourseComponent } from './assign-student-to-course/assign-student-to-course.component';
import { CourseManagementComponent } from './course-management/course-management.component';
import { UsersComponent } from './users/users.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminDashboaredComponent,
    AssignStudentToCourseComponent,
    CourseManagementComponent,
    UsersComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
