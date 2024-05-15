import { Component } from '@angular/core';
import { AssessmentsService } from '../../services/assessments-service/assessments.service';
import { Subscription } from 'rxjs';
import { Course } from '../../models/Course';
import { Assessment } from '../../models/Assessment';
import { User } from '../../models/User';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrl: './grades.component.css'
})
export class GradesComponent {
  AssignmentSub:Subscription;
  Assignments:Assessment[]=[];
  user:User=new User("", "", "", "", "", 4, true, []);
  selectedOption: number=1; // Variable to store the selected option
    constructor(private AssessmentsService:AssessmentsService,private authService: AuthService){
         this.AssignmentSub=this.AssessmentsService.getAssessments().subscribe((ass)=>{
          this.Assignments=ass;
          this.user = this.authService.getCurrentUser() ?? new User("", "", "", "", "", 4, true, []);
          
        })
       
        
    }


  // Method to handle option selection
  onSelect(option: number) {
    this.selectedOption = option;
    console.log(this.user);
  }
}
