import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURL = 'http://localhost:9091/auth';
  private signupUrl = 'http://localhost:8081/users';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/login`, credentials, { responseType: 'text' as 'json' })
      .pipe(
        tap((token) => {
          if (typeof window !== 'undefined') {
            localStorage.setItem('token', token);
          }
        })
      );
  }

  signup(userData: { name: string; email: string; password: string; role: string }): Observable<any> {
    return this.http.post<any>(`${this.signupUrl}/signup`, userData, { responseType: 'text' as 'json' });
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }

  isLoggedIn(): boolean {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('token');
    }
    return false;
  }
}
