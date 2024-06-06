import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ActivityService } from '../services/activity.service';
import { Activity } from '../models/Activity.model';

@Component({
  selector: 'app-all-activities-expert',
  templateUrl: './all-activities-expert.component.html',
  styleUrls: ['./all-activities-expert.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class AllActivitiesExpertComponent implements OnInit {
  activities: Activity[] = [];

  constructor(private activityService: ActivityService, private router: Router) {}

  ngOnInit() {
    this.fetchActivitiesByExpert();
  }

  fetchActivitiesByExpert() {
    this.activityService.getActivitiesByExpert().subscribe(
      (data: Activity[]) => {
        this.activities = data;
      },
      (error) => {
        console.error('Error fetching activities by expert:', error);
      }
    );
  }

  goToAddActivity() {
    this.router.navigate(['/addForm']);
  }

  viewDetails(activity: Activity) {
    const activityId = activity.activityId;
    try{
      this.router.navigate(['/expert/ActivityDetails/'+activityId]);
    } catch(error){
      console.log(error)
    }
  }

  goToUserDetails() {
    const userId = this.activityService.getUserIdFromToken();

    try{
      this.router.navigate(['/expert/UserDetails/'+userId]);
    } catch(error){
      console.log(error)
    }
  }

  logout() {
    localStorage.removeItem('token');
    alert('You have been logged out successfully.')
    this.router.navigate(['/login']);
  }
}
