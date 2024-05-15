import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Firestore, collection, collectionData, doc, updateDoc } from '@angular/fire/firestore';

import { User } from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  constructor(private firestore: Firestore, private toastr: ToastrService) { }

  getUsers(): Observable<User[]> {
    const users = collectionData(collection(this.firestore, 'users'), { idField: 'id' })
    return users as Observable<User[]>;
  }

  updateUser(user: User) {
    const ref = doc(this.firestore, 'users', user.id);
    updateDoc(ref, { ...user });
  }

  showSuccess(message: string) {
    this.toastr.success(message, 'Success', {
      timeOut: 3000, // toast timeout in milliseconds (default is 3000)
      progressBar: true, // show progress bar
      positionClass: 'toast-top-right' // toast position
    });
  }

  showError(message: string) {
    this.toastr.error(message, 'Error', {
      timeOut: 3000, // toast timeout in milliseconds (default is 3000)
      progressBar: true, // show progress bar
      positionClass: 'toast-top-right' // toast position
    });
  }
}
