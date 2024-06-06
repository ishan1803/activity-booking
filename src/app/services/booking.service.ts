import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private apiURL = 'http://localhost:8084/bookings';

  constructor(private http: HttpClient) { }

  getBookingsByActivityId(activityId: string): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/byActivityId/${activityId}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching bookings', error);
        return throwError(error); // Propagate error
      })
    );
  }

  getBookingsByUserId(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/byUserId/${userId}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching bookings', error);
        return throwError(error);
      })
    );
  }

  cancelBooking(bookingId: string): Observable<any> {
    return this.http.delete(`${this.apiURL}/cancel/${bookingId}`, { responseType: 'text' }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error canceling booking', error);
        return throwError(error);
      })
    );
  }
  

  makeBooking(userId: string, activityId: string): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'userId': userId
      }),
      responseType: 'text' as 'json' // Specify response type as text
    };
    return this.http.post<any>(`${this.apiURL}/make/${activityId}`, {}, options).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error making booking', error);
        return throwError(error); // Propagate error
      })
    );
  }
}
