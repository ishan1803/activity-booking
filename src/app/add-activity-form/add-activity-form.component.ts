import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ActivityService } from '../services/activity.service';
import { AuthService } from '../services/auth.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-add-activity-form',
  templateUrl: './add-activity-form.component.html',
  styleUrls: ['./add-activity-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class AddActivityFormComponent {
  activityForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activityService: ActivityService,
    private authService: AuthService,
    private location: Location
  ) {
    this.activityForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      imageUrl: ['', Validators.required] // Add imageUrl field to the form
    });
  }

  onSubmit() {
    if (this.activityForm.valid) {
      this.activityService.addActivity(this.activityForm.value).subscribe({
        next: (response) => {
          alert('Activity Successfully Created');
          console.log('Server response:', response); // Log server response if needed
          this.router.navigate(['/allActivitiesExpert']);
        },
        error: (err) => {
          console.error('Error adding activity', err);
        }
      });
    }
  }

  
goBack() {
  this.location.back();
 }
  
}
