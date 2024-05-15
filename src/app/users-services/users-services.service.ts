import { Injectable } from '@angular/core';
import { Firestore, collectionData, docData } from '@angular/fire/firestore';
import { Observable, combineLatest, map, switchMap } from 'rxjs';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { User } from '../models/User';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class UsersServicesService {

  constructor(private fireStore: Firestore){}

  getUsers(): Observable<User[]> {
    const usersCollection = collection(this.fireStore, 'users');
    return collectionData(usersCollection, { idField: 'id' }) as Observable<User[]>;
  }


}
