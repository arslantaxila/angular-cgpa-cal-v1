import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import {
  Status,
  Transcript,
  User
} from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiURLUsers = environment.apiURL + 'user';
  apiURLTranscript = environment.apiURL + 'transcript';
  apiURLSemester = environment.apiURL + 'semester';

  constructor(private http: HttpClient, private router: Router) { }

  getTranscript(): Observable<any> {
    return this.http.get<[]>(`${this.apiURLTranscript}`);
  }

  getMyTranscript(): Observable<any> {
    return this.http.get<[]>(`${this.apiURLTranscript}/mine`);
  }

  getDashbaordCount(d: any): Observable<any> {
    return this.http.get<[]>(`${this.apiURLTranscript}/dashboardcount/${d}`);
  }

  mygetDashbaordCount(d: any): Observable<any> {
    return this.http.get<[]>(`${this.apiURLTranscript}/mydashboardcount/${d}`);
  }

  
  viewImage(docName: string): Observable<any> {
    return this.http.get(`${this.apiURLUsers}/images/${docName}`, {
      responseType: 'blob',
    });
  }

  getSemester(): Observable<any> {
    return this.http.get<[]>(`${this.apiURLSemester}`);
  }

  getSemesterCourses(semester: number): Observable<any> {
    return this.http.get<any>(`${this.apiURLSemester}/course/${semester}`);
  }

  getGrade(): Observable<any> {
    return this.http.get<[]>(`${this.apiURLTranscript}/grade`);
  }

  updateTranscriptStatus(status: Status, id: any): Observable<Status> {
    return this.http.put<Status>(
      `${this.apiURLTranscript}/${id}`,
      status
    );
  }

  deleteTranscript(id: any): Observable<any> {
    return this.http.delete<any>(
      `${this.apiURLTranscript}/${id}`
    );
  }

  deleteSemester(id: any): Observable<any> {
    return this.http.delete<any>(
      `${this.apiURLSemester}/${id}`
    );
  }

  addSemester(semester: any): Observable<any> {
    return this.http.post<[]>(`${this.apiURLSemester}/create`, semester);
  }

  updateSemester(semester: any, id: any): Observable<any> {
    return this.http.put<[]>(
      `${this.apiURLSemester}/${id}`,
      semester
    );
  }


  getUser(): Observable<any> {
    return this.http.get<[]>(`${this.apiURLUsers}`);
  }


  addTranscript(transcript: Transcript): Observable<Transcript> {
    return this.http.post<Transcript>(`${this.apiURLTranscript}/create`, transcript);
  }


  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiURLUsers}/create`, user);
  }

  importfile(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiURLSemester}/import`, formData);
  }


  updateUser(user: User, id: any): Observable<User> {
    return this.http.put<User>(
      `${this.apiURLUsers}/${id}`,
      user
    );
  }

  downloadAttachment(): Observable<any> {
    return this.http.get(`${this.apiURLSemester}/getDocument`,
      { responseType: 'blob' }
    );
  }
}
