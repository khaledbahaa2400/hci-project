import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '../../models/User';
import { Firestore, collection } from '@angular/fire/firestore';
import { addDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { isPlatformBrowser } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_STORAGE_KEY = 'auth';
  private readonly USER_STORAGE_KEY = 'user';

  private isUserAuthenticated: boolean;
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private fireStore: Firestore, @Inject(PLATFORM_ID) private platformId: any, private toastr: ToastrService) {
    this.isUserAuthenticated = false;
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
    this.currentUser = this.currentUserSubject.asObservable();

    // Check if running in the browser before accessing localStorage
    if (isPlatformBrowser(this.platformId)) {
      const authData = localStorage.getItem(this.AUTH_STORAGE_KEY);
      const userData = localStorage.getItem(this.USER_STORAGE_KEY);

      this.isUserAuthenticated = !!authData;
      this.currentUserSubject.next(userData ? JSON.parse(userData) : null);
    }
  }

  // Method to set the current user
  setCurrentUser(user: User | null): void {
    this.isUserAuthenticated = true;
    localStorage.setItem(this.AUTH_STORAGE_KEY, 'true');
    localStorage.setItem(this.USER_STORAGE_KEY, JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  register(user: User) {
    const userDocument = { 'username': user.username, 'email': user.email, 'password': user.password, 'role': user.role, 'isActivated': false }
    addDoc(collection(this.fireStore, 'users'), userDocument);
  }

  async checkUser(email: string): Promise<any> {
    try {
      // Create a query to retrieve the document based on the values of two fields
      const q = query(collection(this.fireStore, 'users'),
        where('email', '==', email));

      // Execute the query
      const querySnapshot = await getDocs(q);

      // Check if the query returned any documents
      if (!querySnapshot.empty) {
        // Retrieve the first document (assuming there's only one document matching the query)
        const docSnapshot = querySnapshot.docs[0];

        // Return the document data
        return docSnapshot.data();
      } else {
        // No document matching the query
        return null;
      }
    } catch (error) {
      // Error fetching document
      console.error('Error fetching document:', error);
      throw error;
    }
  }

  async login(email: string, password: string, role: string): Promise<any> {
    try {
      // Create a query to retrieve the document based on the values of two fields
      const q = query(collection(this.fireStore, 'users'),
        where('email', '==', email),
        where('password', '==', password),
        where('role', '==', role));

      // Execute the query
      const querySnapshot = await getDocs(q);

      // Check if the query returned any documents
      if (!querySnapshot.empty) {
        // Retrieve the first document (assuming there's only one document matching the query)
        const docSnapshot = querySnapshot.docs[0];

        // Return the document data
        return docSnapshot.data();
      } else {
        // No document matching the query
        return null;
      }
    } catch (error) {
      // Error fetching document
      console.error('Error fetching document:', error);
      throw error;
    }
  }

  // Method to log out the user
  logout(): void {
    this.isUserAuthenticated = false;
    localStorage.removeItem(this.AUTH_STORAGE_KEY);
    localStorage.removeItem(this.USER_STORAGE_KEY);
    this.currentUserSubject.next(null);
  }

  // Method to check if the user is authenticated
  isAuthenticated(): boolean {
    return this.isUserAuthenticated;
  }

  // Method to return the current user type
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
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
