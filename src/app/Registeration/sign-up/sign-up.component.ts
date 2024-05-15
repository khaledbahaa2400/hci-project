import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';
import { User } from '../../models/User';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  reactiveFormGroup: FormGroup;

  constructor(private authService: AuthService) {
    this.reactiveFormGroup = new FormGroup({
      username: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl("", [Validators.required, Validators.minLength(6)]),
      role: new FormControl("instructor", Validators.required),
    })
  }

  async register() {
    const user = await this.authService.checkUser(this.reactiveFormGroup.value.email)
    if (user) {
      // Return user already exist
    } else {
      const newUser = new User("", this.reactiveFormGroup.value.username, this.reactiveFormGroup.value.email, this.reactiveFormGroup.value.password, this.reactiveFormGroup.value.role, -1, false, []);
      this.authService.register(newUser)
      this.reactiveFormGroup.reset();
      this.reactiveFormGroup.get('role')?.setValue("instructor");
      this.authService.showSuccess("User Created Successfully")
    }
  }
}
