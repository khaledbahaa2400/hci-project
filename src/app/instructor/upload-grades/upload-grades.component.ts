import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AssessmentsService } from '../../services/assessments-service/assessments.service';
import { Assessment } from '../../models/Assessment';

@Component({
  selector: 'app-upload-grades',
  templateUrl: './upload-grades.component.html',
  styleUrl: './upload-grades.component.css'
})
export class UploadGradesComponent {
  reactiveFormGroup: FormGroup;
  year = 1;
  assessments: Assessment[] = this.assessmentsService.filterAssessmentsByYear(this.year, "Khaled");

  constructor(private assessmentsService: AssessmentsService) {
    this.reactiveFormGroup = new FormGroup({
      name: new FormControl(this.assessments[0].name, Validators.required),
      uploadType: new FormControl("individual", Validators.required),
      studentID: new FormControl("", Validators.required),
      studentGrade: new FormControl(0, [Validators.required, Validators.min(0)]),
    })
  }

  changeYear() {
    this.assessments = this.assessmentsService.filterAssessmentsByYear(this.year, "Khaled");
    this.reactiveFormGroup.value.name = this.assessments[0].name;
  }

  uploadGrade() {

  }
}
