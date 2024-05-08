import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CourseDetailsComponent } from './Student/course-details/course-details.component';
import { CoursesComponent } from './Student/courses/courses.component';
import { CourseRegisterationComponent } from './Student/course-registeration/course-registeration.component';
import { GradesComponent } from './Student/grades/grades.component';
import { LogInComponent } from './Registeration/log-in/log-in.component';
import { SignUpComponent } from './Registeration/sign-up/sign-up.component';

const routes: Routes = [
  {path:'signup',component:SignUpComponent},
  {path:'login',component:LogInComponent},
  {path:'courses',component:CoursesComponent},
  {path:'course-registeration',component:CourseRegisterationComponent},
  {path:'grades',component:GradesComponent},
  {path:'course-details',component:CourseDetailsComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
