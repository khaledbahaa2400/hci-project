import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseDetailsComponent } from './Student/course-details/course-details.component';
import { CoursesComponent } from './Student/courses/courses.component';
import { CourseRegisterationComponent } from './Student/course-registeration/course-registeration.component';
import { GradesComponent } from './Student/grades/grades.component';

const routes: Routes = [
  {path:'course-details',component:CourseDetailsComponent},
  {path:'courses',component:CoursesComponent},
  {path:'course-registeration',component:CourseRegisterationComponent},
  {path:'grades',component:GradesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
