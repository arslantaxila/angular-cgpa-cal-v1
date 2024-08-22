import { Injectable } from '@angular/core';

const TOKEN = 'jwtToken';
@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  setToken(data: string) {
    localStorage.setItem(TOKEN, data);
  }
  getToken(): string | null {
    return localStorage.getItem(TOKEN);
  }
  removeToken() {
    localStorage.removeItem(TOKEN);
    // localStorage.removeItem('id');
    // localStorage.removeItem('name');
    // localStorage.removeItem('role');
    // localStorage.removeItem('id');
    localStorage.clear();
  }
}
