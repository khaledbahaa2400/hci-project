import { Component } from '@angular/core';
import { AssessmentsService } from '../../services/assessments-service/assessments.service';
import { Assessment } from '../../models/Assessment';

@Component({
  selector: 'app-upload-grades',
  templateUrl: './upload-grades.component.html',
  styleUrl: './upload-grades.component.css'
})
export class UploadGradesComponent {
  constructor(private assessmentsService: AssessmentsService) { }

  year = 1;
  assessments: Assessment[] = this.assessmentsService.filterAssessmentsByYear(this.year, "Khaled");

  name = this.assessments[0].name;
  uploadType = 'individual';
  studentID = '';
  studentGrade = 0;

  changeYear() {
    this.assessments = this.assessmentsService.filterAssessmentsByYear(this.year, "Khaled");
    this.name = this.assessments[0].name;
  }

  uploadGrade() {

  }
}
