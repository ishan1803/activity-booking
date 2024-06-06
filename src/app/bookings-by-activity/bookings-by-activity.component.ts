import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from '../services/booking.service';
import { UserService } from '../services/user.service';
import { Booking } from '../models/Booking.model'; // Assuming you have a Booking model
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-bookings-by-activity',
  templateUrl: './bookings-by-activity.component.html',
  styleUrls: ['./bookings-by-activity.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class BookingsByActivityComponent implements OnInit {
  bookings: Booking[] = [];

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService,
    private userService: UserService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const activityId = params['activityId'];
      this.getBookingsByActivityId(activityId);
    });
  }

  getBookingsByActivityId(activityId: string): void {
    this.bookingService.getBookingsByActivityId(activityId).subscribe({
      next: (bookings) => {
        this.bookings = bookings;
        this.loadUserDetailsForBookings();
      },
      error: (error) => {
        console.error('Error fetching bookings', error);
        // Handle error
      }
    });
  }

  loadUserDetailsForBookings(): void {
    this.bookings.forEach(booking => {
      const userId = booking.userId.toString(); // Convert userId to string
      this.userService.getUserDetailsForCustomer(userId).subscribe({
        next: (user) => {
          booking.userName = user.name;
          booking.userEmail = user.email;
        },
        error: (error) => {
          console.error('Error fetching user details', error);
          // Handle error
        }
      });
    });
  }

  goBack() {
    this.location.back();
   }
  

}
