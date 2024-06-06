import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityService } from '../services/activity.service';
import { BookingService } from '../services/booking.service';
import { AuthService } from '../services/auth.service';
import { Activity } from '../models/Activity.model';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';


@Component({
  selector: 'app-activity-details-cust',
  templateUrl: './activity-details-cust.component.html',
  styleUrls: ['./activity-details-cust.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class ActivityDetailsCustomerComponent implements OnInit {
  activity!: Activity;
  images: string[] = [
    'assets/activity1.jpg',
    'assets/activity2.jpg',
    'assets/activity3.jpg',
    'assets/activity4.jpg',
    'assets/activity5.jpg'
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private activityService: ActivityService,
    private bookingService: BookingService,
    private authService: AuthService,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.fetchActivityDetails(id);
    });
  }

  fetchActivityDetails(activityId: string) {
    this.activityService.getActivityDetailsForCustomer(activityId).subscribe({
      next: (activity) => {
        this.activity = activity;
        console.log(this.activity);
      },
      error: (err) => {
        console.error('Error fetching activity details', err);
      }
    });
  }

  viewReviews(activityId: string) {
    this.router.navigateByUrl('/reviews/' + activityId);
  }

  bookActivity(activityId: string) {
    if (!this.authService.isLoggedIn()) {
      alert('User not logged in');
      return;
    }

    const userId = this.activityService.getUserIdFromToken();
    if (!userId) {
      alert('User ID not found');
      return;
    }

    this.bookingService.makeBooking(userId, activityId).subscribe({
      next: () => {
        alert('Activity booked successfully');
        this.router.navigate(['/bookings/'+userId]);
      },
      error: (err) => {
        console.error('Error booking activity', err);
        alert('Failed to book activity');
      }
    });
  }

  giveReview(activityId: string) {
    this.router.navigateByUrl('/writeReviewForm/' + activityId);
  }

  goBack() {
    this.location.back();
   }
}
