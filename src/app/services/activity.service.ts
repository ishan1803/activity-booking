import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Activity } from '../models/Activity.model';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private apiURL = 'http://localhost:8083/activities';

  constructor(private http: HttpClient) {}

  private getToken(): string | null {
    return localStorage.getItem('token'); // Assuming the token is stored in localStorage
  }

  public getUserIdFromToken(): string {
    const token = this.getToken();
    if (!token) {
      throw new Error('Token not found');
    }

    const payloadStr = token.split('.')[1];
    const tokenPayload = JSON.parse(atob(payloadStr));
    return tokenPayload.userId;
  }

  public getUserRoleFromToken(): string {
    const token = this.getToken();
    if (!token) {
      throw new Error('Token not found');
    }

    const payloadStr = token.split('.')[1];
    const tokenPayload = JSON.parse(atob(payloadStr));
    return tokenPayload.role;
  }

  private handleResponse(response: any): any {
    if (typeof response === 'string') {
      try {
        return JSON.parse(response);
      } catch (e) {
        return response;
      }
    }
    return response;
  }

  getAllActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${this.apiURL}/All`);
  }

  getActivitiesByName(name: string): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${this.apiURL}/byName/${name}`);
  }

  getActivitiesByLocation(location: string): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${this.apiURL}/byLocation/${location}`);
  }

  getActivitiesByExpert(): Observable<Activity[]> {
    const expertId = this.getUserIdFromToken();
    return this.http.get<Activity[]>(`${this.apiURL}/byExpert/${expertId}`);
  }

  addActivity(activity: Activity): Observable<any> {
    const userId = this.getUserIdFromToken();
    const options = {
      headers: new HttpHeaders({
        'userId': userId
      }),
      responseType: 'text' as 'json'
    };
    return this.http.post<any>(`${this.apiURL}/add`, activity, options).pipe(
      map(this.handleResponse),
      catchError((error: HttpErrorResponse) => {
        console.error('Error adding activity', error);
        return throwError(error);
      })
    );
  }

  updateActivity(activityId: string, activity: Activity): Observable<any> {
    const userId = this.getUserIdFromToken();
    const options = {
      headers: new HttpHeaders({
        'userId': userId
      }),
      responseType: 'text' as 'json'
    };
    return this.http.put<any>(`${this.apiURL}/${activityId}`, activity, options).pipe(
      map(this.handleResponse),
      catchError((error: HttpErrorResponse) => {
        console.error('Error updating activity', error);
        return throwError(error);
      })
    );
  }

  deleteActivity(activityId: string): Observable<any> {
    const userId = this.getUserIdFromToken();
    const options = {
      headers: new HttpHeaders({
        'userId': userId
      }),
      responseType: 'text' as 'json'
    };
    return this.http.delete<any>(`${this.apiURL}/${activityId}`, options).pipe(
      map(this.handleResponse),
      catchError((error: HttpErrorResponse) => {
        console.error('Error deleting activity', error);
        return throwError(error);
      })
    );
  }

  getActivityDetailsForCustomer(activityId: string): Observable<Activity> {
    return this.http.get<Activity>(`${this.apiURL}/forCustomer/${activityId}`);
  }

  getActivityDetailsForAdmin(activityId: string): Observable<Activity> {
    return this.http.get<Activity>(`${this.apiURL}/forAdmin/${activityId}`);
  }

  getActivityDetailsForExpert(activityId: string): Observable<Activity> {
    return this.http.get<Activity>(`${this.apiURL}/forExpert/${activityId}`);
  }
}
