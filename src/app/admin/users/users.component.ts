import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../models/User';
import { UsersServicesService } from '../../users-services/users-services.service';
import { AuthService } from '../../services/auth-service/auth.service';
import { StudentsService } from '../../services/students-service/students.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  Userssub: Subscription;
  Users: User[] = [];

  constructor(private userserviceService: UsersServicesService, private authService: AuthService, private studentService: StudentsService) {
    this.Userssub = this.userserviceService.getUsers().subscribe((data) => {
      this.Users = data;
      const user = authService.getCurrentUser()
      this.Users = this.Users.filter(u => u.email != user?.email)
    })
  }

  toggleActivation(user: User) {
    user.isActivated = !user.isActivated
    this.studentService.updateUser(user);
  }

  deleteUser(user: User) {
    this.userserviceService.deleteUser(user)
  }
}
