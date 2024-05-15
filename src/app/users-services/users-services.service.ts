import { Injectable } from '@angular/core';
import { Firestore, collectionData, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { collection, doc } from 'firebase/firestore';
import { User } from '../models/User';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class UsersServicesService {

  constructor(private fireStore: Firestore) { }

  getUsers(): Observable<User[]> {
    const usersCollection = collection(this.fireStore, 'users');
    return collectionData(usersCollection, { idField: 'id' }) as Observable<User[]>;
  }

  deleteUser(user: User) {
    const ref = doc(this.fireStore, 'users', user.id);
    deleteDoc(ref)
  }
}
