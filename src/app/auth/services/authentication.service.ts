import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LocalstorageService } from './localstorage.service';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { User } from '../../user/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private apiURL = `${environment.apiURL}user`;
  constructor(
    private http: HttpClient,
    private token: LocalstorageService,
    private router: Router
  ) {}

  
  login(enrollment: string, password: string): Observable<any> {
    return this.http.post<User>(`${this.apiURL}/login`, {
      enrollment,
      password,
    });
  }

  adminlogin(email: string, password: string): Observable<any> {
    return this.http.post<User>(`${this.apiURL}/adminlogin`, {
      email,
      password,
    });
  }

  userSignup(user: User): Observable<any> {
    return this.http.post<User>(`${this.apiURL}/create/student`, user);
  }

  logout() {
    this.token.removeToken();
    this.router.navigate(['/']);
  }
}
