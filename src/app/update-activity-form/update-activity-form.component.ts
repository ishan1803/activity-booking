import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityService } from '../services/activity.service';
import { Activity } from '../models/Activity.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-activity-form',
  templateUrl: './update-activity-form.component.html',
  styleUrls: ['./update-activity-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class UpdateActivityFormComponent implements OnInit {
  updateForm: FormGroup;
  activityId!: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private activityService: ActivityService,
    private location: Location,
  ) {
    this.updateForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.activityId = params['activityId'];
      this.loadActivityDetails(this.activityId);
    });
  }

  loadActivityDetails(activityId: string) {
    this.activityService.getActivityDetailsForExpert(activityId).subscribe({
      next: (activity) => {
        this.updateForm.patchValue({
          name: activity.name,
          location: activity.location,
          price: activity.price
        });
      },
      error: (err) => {
        console.error('Error fetching activity details', err);
        alert('Failed to load activity details');
      }
    });
  }

  onSubmit() {
    if (this.updateForm.valid) {
      const updatedActivity: Activity = this.updateForm.value;
      const userId = this.activityService.getUserIdFromToken(); // Fetch userId from the token
      updatedActivity.expertId = userId; // Ensure userId is included in the updated activity
      this.activityService.updateActivity(this.activityId, updatedActivity).subscribe({
        next: () => {
          alert('Activity updated successfully');
          //this.router.navigate(['/allActivitiesExpert']);
          this.location.back();
        },
        error: (err) => {
          console.error('Error updating activity', err);
          alert('Failed to update the activity');
        }
      });
    }
  }

  goBack() {
    this.location.back();
   }

}
