import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { ActivityService } from '../services/activity.service';
import { Activity } from '../models/Activity.model';

@Component({
  selector: 'app-all-activities',
  templateUrl: './all-activities.component.html',
  styleUrls: ['./all-activities.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class AllActivitiesComponent implements OnInit {
  activities: Activity[] = [];
  userLoggedIn = false;
  userRole: string | null = null;
  searchQuery: string = '';
  searchType: string = 'location';

  constructor(
    private router: Router,
    private authService: AuthService,
    private activityService: ActivityService
  ) {}

  ngOnInit() {
    this.userLoggedIn = this.authService.isLoggedIn();
    if (this.userLoggedIn) {
      this.userRole = this.activityService.getUserRoleFromToken();
    }
    this.getAllActivities();
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }

  goToUserDetails() {
    const userId = this.activityService.getUserIdFromToken();
    if (!userId) {
      return;
    }
    if (this.userRole === 'CUSTOMER') {
      try{
        this.router.navigate(['/customer/UserDetails/'+userId]);
      } catch(error){
        console.log(error)
      }
    } else if (this.userRole === 'ADMIN') {
      try{
        this.router.navigate(['/admin/UserDetails/'+userId]);
      } catch(error){
        console.log(error)
      }
    }
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
  

  search() {
    if (this.searchType === 'location') {
      this.router.navigate(['/allActivitiesLocation'], { queryParams: { query: this.searchQuery } });
    } else if (this.searchType === 'name') {
      this.router.navigate(['/allActivitiesName'], { queryParams: { query: this.searchQuery } });
    }
  }

  logout() {
    this.authService.logout();
    this.userLoggedIn = false;
    alert('You have been logged out successfully.')
    this.router.navigate(['/login']);
  }

  onSearchQueryChange(event: Event) {
    this.searchQuery = (event.target as HTMLInputElement).value;
  }

  onSearchTypeChange(event: Event) {
    this.searchType = (event.target as HTMLSelectElement).value;
  }

  getAllActivities() {
    this.activityService.getAllActivities().subscribe({
      next: (response) => {
        this.activities = response;
      },
      error: (err) => {
        console.error('Error fetching activities', err);
      }
    });
  }
}
