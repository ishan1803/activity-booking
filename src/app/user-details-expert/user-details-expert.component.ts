import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/User.model';
import { Location } from '@angular/common';

@Component({
  selector: 'user-details-expert',
  templateUrl: './user-details-expert.component.html',
  styleUrls: ['./user-details-expert.component.css']
})
export class UserDetailsExpertComponent implements OnInit {
  user!: User; // Initialize user as undefined initially

  constructor(private route: ActivatedRoute, private userService: UserService,private router: Router,
    private location: Location) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = params['id']; // Assuming the route parameter is named 'id'
      this.fetchUserDetails(userId);
    });
  }

  fetchUserDetails(userId: string) {
    this.userService.getUserDetailsForExpert(userId).subscribe({
      next: (user) => {
        this.user = user;
        console.log(this.user);
      },
      error: (err) => {
        console.error('Error fetching user details', err);
      }
    });
  }

  updateDetails(userId: number) {
    this.router.navigateByUrl('/updateUser/' + userId).then(success => {
      if (success) {
        console.log('Navigation successful');
      } else {
        console.error('Navigation failed');
      }
    });
  }

  goBack() {
    this.location.back();
   }
}
