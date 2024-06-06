import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/User.model';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiURL = 'http://localhost:8081/users';

  constructor(private http: HttpClient) { }

  getUserDetailsForCustomer(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiURL}/forCustomer/${userId}`);
  }

  getUserDetailsForAdmin(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiURL}/forAdmin/${userId}`);
  }

  getUserDetailsForExpert(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiURL}/forExpert/${userId}`);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiURL}/`);
  }

  getUserDetails(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiURL}/${userId}`);
    }

  updateUser(userId: string, userData: any): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text' as 'json'
    };
    return this.http.put<any>(`${this.apiURL}/${userId}`, userData, options)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error updating user', error);
          console.log('Response body:', error.error); // Log response body
          throw error; // Rethrow the error to propagate it further
        })
      );
  }
}
