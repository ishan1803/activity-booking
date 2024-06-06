import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-user-form',
  templateUrl: './update-user-form.component.html',
  styleUrls: ['./update-user-form.component.css']
})
export class UpdateUserFormComponent {

  constructor(private router: Router, private userService: UserService, private route: ActivatedRoute,private location: Location,) {}

  onSubmit(name: string, email: string, password: string) {
    // Fetch userId from the URL
    const userId = this.route.snapshot.paramMap.get('userId');

    // Check if userId is not null before proceeding
    if (userId !== null) {
      // Prepare updated user data
      const updatedUserData = {
        name: name,
        email: email,
        password: password
      };

      // Call the updateUser method of UserService
      this.userService.updateUser(userId, updatedUserData).subscribe({
        next: () => {
          alert('Your details are updated successfully');
          this.location.back();  
        },
        error: (err) => {
          console.error('Error updating user', err);
          alert('Failed to update user details');
        }
      });
    } else {
      console.error('User ID not found in the URL');
    }
  }

  
goBack() {
  this.location.back();
 }
}
