import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AssessmentsService } from '../../services/assessments-service/assessments.service';
import { Assessment } from '../../models/Assessment';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-upload-grades',
  templateUrl: './upload-grades.component.html',
  styleUrl: './upload-grades.component.css'
})
export class UploadGradesComponent {
  reactiveFormGroup: FormGroup;
  subscription: Subscription;
  assessments: Assessment[] = [];
  yearAssessments: Assessment[] = [];

  constructor(private assessmentsService: AssessmentsService, private authService: AuthService) {
    this.reactiveFormGroup = new FormGroup({
      year: new FormControl(1, Validators.required),
      name: new FormControl("", Validators.required),
      uploadType: new FormControl("individual", Validators.required),
      studentID: new FormControl("", Validators.required),
      studentGrade: new FormControl(0, [Validators.required, Validators.min(0)]),
      file: new FormControl(''),
    })

    this.subscription = this.assessmentsService.getAssessments().subscribe((assessments) => {
      this.assessments = assessments;
      this.filterAssessmentsByYear();
      this.reactiveFormGroup.get("name")?.setValue(this.yearAssessments[0]?.name);
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  changeUploadType() {
    if (this.reactiveFormGroup.value.uploadType == "individual") {
      this.reactiveFormGroup.controls['studentID'].setValidators([Validators.required]);
      this.reactiveFormGroup.controls['studentID'].updateValueAndValidity()
      this.reactiveFormGroup.controls['studentGrade'].setValidators([Validators.required, Validators.min(0)]);
      this.reactiveFormGroup.controls['studentGrade'].updateValueAndValidity()
      this.reactiveFormGroup.controls['file'].removeValidators(Validators.required)
      this.reactiveFormGroup.controls['file'].updateValueAndValidity()
    } else {
      this.reactiveFormGroup.controls['studentID'].removeValidators([Validators.required])
      this.reactiveFormGroup.controls['studentID'].updateValueAndValidity()
      this.reactiveFormGroup.controls['studentGrade'].removeValidators([Validators.required, Validators.min(0)])
      this.reactiveFormGroup.controls['studentGrade'].updateValueAndValidity()
      this.reactiveFormGroup.controls['file'].setValidators([Validators.required])
      this.reactiveFormGroup.controls['file'].updateValueAndValidity()
    }
  }

  filterAssessmentsByYear() {
    const user = this.authService.getCurrentUser()
    this.yearAssessments = this.assessments.filter(assessment => assessment.year == this.reactiveFormGroup.value.year && assessment.instructor == user?.username);
    this.reactiveFormGroup.get("name")?.setValue(this.yearAssessments[0]?.name);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.reactiveFormGroup.patchValue({
      file: file
    });
  }

  uploadGrade() {
    if (this.reactiveFormGroup.value.uploadType == "individual") {
      let assessment = this.assessments.find(obj => obj.name == this.reactiveFormGroup.value.name);
      if (assessment) {
        assessment.grades[this.reactiveFormGroup.value.studentID] = this.reactiveFormGroup.value.studentGrade;
        this.assessmentsService.updateAssessment(assessment);
        this.assessmentsService.showSuccess("Grade Uploaded Successfully")
        this.reactiveFormGroup.reset({
          year: 1,
          name: "",
          uploadType: "individual",
          studentID: "",
          studentGrade: 0,
        });
      }
    } else {
      const file: File = this.reactiveFormGroup.value.file;
      const reader = new FileReader();
      reader.readAsText(file)

      reader.onload = (event) => {
        const contents = reader.result as string;
        const lines = contents.split('\n');
        if (lines.length > 0) {
          const firstRowValues = lines[0].split('\t');
          if (firstRowValues.length === 2 && firstRowValues[0].trim() == 'ID' && firstRowValues[1].trim() == 'Grade') {
            let assessment = this.assessments.find(obj => obj.name == this.reactiveFormGroup.value.name);
            if (assessment) {
              for (let i = 1; i < lines.length; i++) {
                const rowValues = lines[i].split('\t');
                if (rowValues.length === 2) {
                  assessment.grades[rowValues[0].trim()] = Number(rowValues[1].trim());
                  this.assessmentsService.updateAssessment(assessment);
                  this.assessmentsService.showSuccess(`Grade ${i} Uploaded Successfully`)
                }
              }
            }
          } else {
            this.assessmentsService.showError('File is Invalid');
          }
        } else {
          this.assessmentsService.showError('File is Empty');
        }
      };
    }
  }
}
