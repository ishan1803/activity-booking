import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Activity } from '../models/Activity.model';
import { ActivityService } from '../services/activity.service';
import { Location } from '@angular/common';



@Component({
  selector: 'app-activity-details-admin',
  templateUrl: './activity-details-admin.component.html',
  styleUrls: ['./activity-details-admin.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class ActivityDetailsAdminComponent implements OnInit {
  activity: any;
  images: string[] = [
    'assets/activity1.jpg',
    'assets/activity2.jpg',
    'assets/activity3.jpg',
    'assets/activity4.jpg',
    'assets/activity5.jpg'
  ];

  constructor(private route: ActivatedRoute, private router: Router, private activityService: ActivityService,  private location: Location) { }

  ngOnInit(): void {
    console.log(this.route.params);
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.fetchActivityDetails(id);
    });
  }

  fetchActivityDetails(activityId: string) {
    this.activityService.getActivityDetailsForAdmin(activityId).subscribe({
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
    console.log('Viewing reviews'+ activityId);
    // Redirect to reviews route
    this.router.navigateByUrl('/reviews/' + activityId);
  }

  viewBookings(activityId: string) {
  
    this.router.navigateByUrl('/bookingsActivity/' + activityId);
  }

  goBack() {
    this.location.back();
   }
}
