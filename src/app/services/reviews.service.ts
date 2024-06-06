import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Experience } from '../models/Experience.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  private apiURL = 'http://localhost:8082/experiences';

  constructor(private http: HttpClient) { }

  getReviewsByActivityId(activityId: string): Observable<Experience[]> {
    const url = `${this.apiURL}/byActivityId/${activityId}`;
    return this.http.get<Experience[]>(url);
  }

  postReview(userId: string, activityId: string, reviewData: any): Observable<any> {
    const url = `${this.apiURL}/${activityId}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'userId': userId
      }),
      responseType: 'text' as 'json' // Expecting a text response
    };
    return this.http.post<any>(url, reviewData, options).pipe(
      catchError((error) => {
        console.error('Error posting review', error);
        return throwError(error);
      })
    );
  }
}
