import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Firestore, collectionData, docData } from '@angular/fire/firestore';
import { Observable, combineLatest, map, switchMap } from 'rxjs';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { User } from '../../models/User';
import { UsersServicesService } from '../../users-services/users-services.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  Userssub:Subscription;
  Users:User[]=[];

  constructor(private userserviceService:UsersServicesService){
     this.Userssub=this.userserviceService.getUsers().subscribe((data)=>{
       this.Users=data;
     })
  }

}
