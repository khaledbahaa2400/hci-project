
import { Component } from '@angular/core';
import { User } from '../../models/User';
import { Course } from '../../models/Course';
import { UsersServicesService } from '../../users-services/users-services.service';
import { Firestore, collectionData, docData } from '@angular/fire/firestore';
import { Observable, Subscription, combineLatest, map, switchMap } from 'rxjs';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { AdminBoardServicesService } from '../../admin-dash-board-services/admin-board-services.service';

@Component({
  selector: 'app-admin-dashboared',
  templateUrl: './admin-dashboared.component.html',
  styleUrl: './admin-dashboared.component.css'
})
export class AdminDashboaredComponent {


  coureseSub:Subscription;
  Courses:Course[]=[];

  UserSub:Subscription;
  users:User[]=[];
  
  constructor(private AdminService:AdminBoardServicesService){
     this.coureseSub=this.AdminService.getCourses().subscribe((data)=>{
       this.Courses=data;

     })
     
     this.UserSub=this.AdminService.getUsers().subscribe((data)=>{
       
       this.users=data;
     })
}
  
  
}
