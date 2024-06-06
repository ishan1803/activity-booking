import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BookingService } from '../services/booking.service';
import { ActivityService } from '../services/activity.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-bookings-by-customer',
  templateUrl: './bookings-by-customer.component.html',
  styleUrls: ['./bookings-by-customer.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class BookingsByCustomerComponent implements OnInit {
  bookings: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookingService: BookingService,
    private activityService: ActivityService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = params['userId'];
      this.getBookingsByUserId(userId);
    });
  }

  getBookingsByUserId(userId: string): void {
    this.bookingService.getBookingsByUserId(userId).subscribe({
      next: (bookings) => {
        this.bookings = bookings;
        console.log(this.bookings)
        this.loadActivityDetailsForBookings();
      },
      error: (error) => {
        console.error('Error fetching bookings', error);
      }
    });
  }

  loadActivityDetailsForBookings(): void {
    this.bookings.forEach(booking => {
      this.activityService.getActivityDetailsForCustomer(booking.activityId).subscribe({
        next: (activity) => {
          booking.activityName = activity.name;
          booking.activityImageUrl = activity.imageUrl;
          booking.activityLocation = activity.location;
        },
        error: (error) => {
          console.error('Error fetching activity details', error);
        }
      });
    });
  }

  cancelBooking(bookingId: string): void {
    if (bookingId) {
      this.bookingService.cancelBooking(bookingId).subscribe({
        next: () => {
          this.bookings = this.bookings.filter(booking => booking.id !== bookingId);
          alert('Booking cancelled successfully');
          window.location.reload();  // Refresh the page
        },
        error: (error) => {
          console.error('Error cancelling booking', error);
        }
      });
    } else {
      console.error('Booking ID is undefined');
    }
  }

  goBack() {
    this.location.back();
   }
  

}
