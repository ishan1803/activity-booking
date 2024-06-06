import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewsService } from '../services/reviews.service';
import { Experience } from '../models/Experience.model';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.css'],
  standalone: true,
  
  imports: [CommonModule],
})
export class ExperiencesComponent implements OnInit {
  experiences: Experience[] = [];
  activityId: string | null = null; // Initialize activityId

  constructor(private reviewsService: ReviewsService, private route: ActivatedRoute,private location: Location,) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      
      this.activityId = params.get('id');
      console.log(this.activityId)
      if (this.activityId) {  
        this.fetchExperiences();
      }
    });
  }

  fetchExperiences() {
    if (!this.activityId) return; // Check if activityId is available
    this.reviewsService.getReviewsByActivityId(this.activityId).subscribe({
      next: (experiences) => {
        this.experiences = experiences;
        console.log(experiences);
      },
      error: (err) => {
        console.error('Error fetching experiences', err);
      }
    });
  }

  getStarsArray(rating: number): number[] {
    return Array(rating).fill(0);
  }

  goBack() {
    this.location.back();
   }
}
