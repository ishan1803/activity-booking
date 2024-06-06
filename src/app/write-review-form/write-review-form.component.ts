import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ReviewsService } from '../services/reviews.service';
import { ActivityService } from '../services/activity.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-write-review-form',
  templateUrl: './write-review-form.component.html',
  styleUrls: ['./write-review-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class WriteReviewFormComponent implements OnInit {
  reviewForm: FormGroup;
  activityId!: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private reviewsService: ReviewsService,
    private activityService: ActivityService,
    private location: Location
  ) {
    this.reviewForm = this.fb.group({
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.activityId = params['id'];
    });
  }

  onSubmit() {
    if (this.reviewForm.valid) {
      const userId = this.activityService.getUserIdFromToken();

      if (this.activityId) {
        this.reviewsService.postReview(userId, this.activityId, this.reviewForm.value).subscribe({
          next: () => {
            alert('Thank you for your Review!!');
            this.location.back();
          },
          error: (err) => {
            console.error('Error posting review', err);
            alert(`Error posting review: ${err.message}`);
          }
        });
      } else {
        console.error('No activityId provided');
        alert('Error: No activityId provided');
      }
    }
  }

  goBack() {
    this.location.back();
   }
}
