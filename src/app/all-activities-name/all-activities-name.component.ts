import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ActivityService } from '../services/activity.service';
import { Activity } from '../models/Activity.model';

@Component({
  selector: 'app-all-activities-name',
  templateUrl: './all-activities-name.component.html',
  styleUrls: ['./all-activities-name.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class AllActivitiesByNameComponent implements OnInit {
  activities: Activity[] = [];
  searchName: string = '';
  userRole: string | null = null;

  constructor(
    private activityService: ActivityService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.searchName = params['query'] || '';
      if (this.searchName) {
        this.fetchActivitiesByName();
      }
    });
    this.userRole = this.activityService.getUserRoleFromToken();
  }

  fetchActivitiesByName() {
    this.activityService.getActivitiesByName(this.searchName).subscribe({
      next: (data: Activity[]) => {
        this.activities = data;
      },
      error: (error) => {
        console.error('Error fetching activities by name:', error);
      },
    });
  }

  goToHome() {
    this.router.navigate(['/allActivities']);
  }

  viewDetails(activity: Activity) {
    const activityId = activity.activityId;
    if (this.userRole === 'CUSTOMER') {
      try{
        this.router.navigate(['/customer/ActivityDetails/'+activityId]);
      } catch(error){
        console.log(error)
      }
    } else if (this.userRole === 'ADMIN') {
      try{
        this.router.navigate(['/admin/ActivityDetails/'+activityId]);
      } catch(error){
        console.log(error)
      }
    }
  }
}
