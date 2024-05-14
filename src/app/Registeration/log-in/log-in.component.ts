import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth-service/auth.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  reactiveFormGroup: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.reactiveFormGroup = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required),
      role: new FormControl("instructor", Validators.required)
    })
  }

  async login() {
    try {
      // Call getDocumentByFields to retrieve the document
      const user = await this.authService.login(this.reactiveFormGroup.value.email, this.reactiveFormGroup.value.password, this.reactiveFormGroup.value.role);

      // Access property from the returned data
      if (user) {
        const isActivated = user['isActivated'];
        if (isActivated) {
          const year = user['year'] ?? -1;
          const currentUser = new User(user['id'], user['username'], user['email'], user['password'], user['role'], year, user['isActivated'], []);
          this.authService.setCurrentUser(currentUser)

          const role = user['role']
          if (role === 'admin')
            this.router.navigate(['/admin'])
          else if (role === 'instructor')
            this.router.navigate(['/instructor'])
          else if (role === "student")
            this.router.navigate(['/student'])
        } else {
          // Return deactivated account
        }
      } else {
        // Return invalid credentials
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
}
