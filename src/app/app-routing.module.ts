import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CourseDetailsComponent } from './Student/course-details/course-details.component';
import { CoursesComponent } from './Student/courses/courses.component';
import { CourseRegisterationComponent } from './Student/course-registeration/course-registeration.component';
import { GradesComponent } from './Student/grades/grades.component';
import { LogInComponent } from './Registeration/log-in/log-in.component';
import { SignUpComponent } from './Registeration/sign-up/sign-up.component';
import { InstructorComponent } from './instructor/instructor/instructor.component';
import { AddCourseComponent } from './instructor/add-course/add-course.component';
import { InstructorCoursesComponent } from './instructor/instructor-courses/instructor-courses.component';
import { StudentsProgressComponent } from './instructor/students-progress/students-progress.component';
import { UploadGradesComponent } from './instructor/upload-grades/upload-grades.component';
import { StudentComponent } from './Student/student/student.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { AuthGuard } from './guards/auth-guard/auth.guard';
import { AdminComponent } from './admin/admin/admin.component';
import { AdminDashboaredComponent } from './admin/admin-dashboared/admin-dashboared.component';
import { UploadMaterialsComponent } from './instructor/upload-materials/upload-materials.component';
import { UsersComponent } from './admin/users/users.component';
import { CourseManagementComponent } from './admin/course-management/course-management.component';
import { AssignStudentToCourseComponent } from './admin/assign-student-to-course/assign-student-to-course.component';

const routes: Routes = [
  { path: 'login', component: LogInComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignUpComponent, canActivate: [AuthGuard] },
  { path: 'unauthorized', component: UnauthorizedComponent },

  {
    path: 'instructor',
    component: InstructorComponent,
    canActivate: [AuthGuard],
    data: { role: 'instructor' },
    children: [
      { path: '', component: InstructorCoursesComponent },
      { path: 'add-course', component: AddCourseComponent },
      { path: 'courses', component: InstructorCoursesComponent },
      { path: 'students-progress', component: StudentsProgressComponent },
      { path: 'upload-grades', component: UploadGradesComponent },
      { path: 'upload-materials', component: UploadMaterialsComponent },
    ]
  },

  {
    path: 'student',
    component: StudentComponent,
    canActivate: [AuthGuard],
    data: { role: 'student' },
    children: [
      { path: '', component: CoursesComponent },
      { path: 'courses', component: CoursesComponent },
      { path: 'course-registeration', component: CourseRegisterationComponent },
      { path: 'grades', component: GradesComponent },
      { path: 'course-details/:courseName', component: CourseDetailsComponent }
    ]
  },

  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin' },
    children: [
      { path: '', component: AdminDashboaredComponent },
      { path: 'Users', component: UsersComponent },
      { path: 'Courses', component: CourseManagementComponent },
      { path: 'Assigncourses', component: AssignStudentToCourseComponent },
      { path: 'Logout', component: LogInComponent },
      { path: 'Courseregisteration', component: CourseRegisterationComponent },
      { path: 'Grades', component: GradesComponent }
    ]
  },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
