import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/User.model';
import { Location } from '@angular/common';

@Component({
  selector: 'user-details-customer',
  templateUrl: './user-details-customer.component.html',
  styleUrls: ['./user-details-customer.component.css']
})
export class UserDetailsCustomerComponent implements OnInit {
  user!: User; // Initialize user as undefined initially

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = params['id']; // Assuming the route parameter is named 'id'
      this.fetchUserDetails(userId);
      
    });
  }

  fetchUserDetails(userId: string) {
    this.userService.getUserDetailsForCustomer(userId).subscribe({
      next: (user) => {
        this.user = user;
        console.log(this.user);
      },
      error: (err) => {
        console.error('Error fetching user details', err);
      }
    });
  }

  fetchBookings(userId: number) {
    this.router.navigateByUrl('/bookings/' + userId)
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
