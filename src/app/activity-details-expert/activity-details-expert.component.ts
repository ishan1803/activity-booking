import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityService } from '../services/activity.service';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';


@Component({
  selector: 'app-activity-details-expert',
  templateUrl: './activity-details-expert.component.html',
  styleUrls: ['./activity-details-expert.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class ActivityDetailsExpertComponent implements OnInit {
  activity: any;
  images: string[] = [
    'assets/activity1.jpg',
    'assets/activity2.jpg',
    'assets/activity3.jpg',
    'assets/activity4.jpg',
    'assets/activity5.jpg'
  ];

  constructor(private route: ActivatedRoute, private router: Router, private activityService: ActivityService, private location: Location,) { }

  ngOnInit(): void {
    console.log(this.route.params);
    this.route.params.subscribe(params => {
      const id = params['id'];
      console.log('Fetching activity details for ID:', id);
      this.fetchActivityDetails(id);
    });
  }

  fetchActivityDetails(activityId: string) {
    this.activityService.getActivityDetailsForExpert(activityId).subscribe({
      next: (activity) => {
        this.activity = activity;
        console.log(this.activity);
      },
      error: (err) => {
        console.error('Error fetching activity details', err);
        if (err.status === 404) {
          alert('Activity not found. It may have been deleted.');
          this.router.navigate(['/all-activities-expert']);
        } else {
          alert('An error occurred while fetching activity details.');
        }
      }
    });
  }

  viewReviews(activityId: string) {
    console.log('Viewing reviews for activity ID:', activityId);
    this.router.navigateByUrl('/reviews/' + activityId);
  }

  deleteActivity(activityId: string) {
    console.log('Expert deleting activity with ID:', activityId);
    this.activityService.deleteActivity(activityId).subscribe({
      next: () => {
        alert('Activity deleted successfully');
        this.router.navigate(['/allActivitiesExpert']);
      },
      error: (err) => {
        console.error('Error deleting activity', err);
        console.log('Response body:', err.error);
        alert('Failed to delete the activity');
      }
    });
  }

  updateActivity(activityId: string) {
    console.log('Expert updating activity with ID:', activityId);
    this.router.navigateByUrl('/updateActivity/' + activityId).then(success => {
      if (success) {
        console.log('Navigation successful');
      } else {
        console.error('Navigation failed');
      }
    });
  }

  viewBookings(activityId: string) {
    this.router.navigateByUrl('/bookingsActivity/' + activityId);
  }

  goBack() {
    this.location.back();
   }
}
