import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { CoursesService } from '../../services/courses-service/courses.service';
import { AssessmentsService } from '../../services/assessments-service/assessments.service';
import { Course } from '../../models/Course';
import { Material } from '../../models/Material';
import { Assessment } from '../../models/Assessment';
import { AuthService } from '../../services/auth-service/auth.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-upload-materials',
  templateUrl: './upload-materials.component.html',
  styleUrl: './upload-materials.component.css'
})
export class UploadMaterialsComponent {
  reactiveFormGroup: FormGroup;
  courses: Course[] = [];
  yearCourses: Course[] = [];
  subscription: Subscription;

  constructor(private coursesService: CoursesService, private assessmentService: AssessmentsService, private authService: AuthService, private storage: AngularFireStorage) {
    this.reactiveFormGroup = new FormGroup({
      year: new FormControl(1, Validators.required),
      course_name: new FormControl("", Validators.required),
      material_name: new FormControl("", Validators.required),
      type: new FormControl("Lecture", Validators.required),
      week: new FormControl(1, [Validators.required, Validators.min(1)]),
      file: new FormControl('', Validators.required),
    });

    this.subscription = this.coursesService.getCourses().subscribe((courses) => {
      this.courses = courses;
      this.filterCoursesByYear();
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filterCoursesByYear(): void {
    this.yearCourses = this.courses.filter(course => course.year == this.reactiveFormGroup.value.year);
    this.reactiveFormGroup.get('course_name')?.setValue(this.yearCourses[0].name);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.reactiveFormGroup.patchValue({
      file: file
    });
  }

  uploadMaterial(): void {
    let course = this.yearCourses.find(course => course.name == this.reactiveFormGroup.value.course_name);
    if (course) {
      const file = this.reactiveFormGroup.value.file;
      const material = new Material(
        "",
        this.reactiveFormGroup.value.material_name,
        this.reactiveFormGroup.value.type,
        file.name,
        this.reactiveFormGroup.value.week,
        {}
      )

      course.materials.push({ ...material });
      this.coursesService.addMaterial(course);

      const filePath = `uploads/${file.name}`;
      this.storage.ref(filePath);
      this.storage.upload(filePath, file);

      if (this.reactiveFormGroup.value.type == "Assessment") {
        const user = this.authService.getCurrentUser();
        this.assessmentService.addAssessment(new Assessment(
          "",
          this.reactiveFormGroup.value.material_name,
          this.reactiveFormGroup.value.course_name,
          user?.username ?? "",
          this.reactiveFormGroup.value.year,
          this.reactiveFormGroup.value.week,
          {},
        ));
      }
      this.coursesService.showSuccess("Material Uploaded Successfully")
      this.reactiveFormGroup.reset({
        year: 1,
        course_name: "",
        material_name: "",
        type: "Lecture",
        week: 1,
      });
      this.reactiveFormGroup.patchValue({
        file: file
      });
    }
  }
}
