import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LocalstorageService } from './localstorage.service';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class RightsGuard implements CanActivate {
  constructor(
    private router: Router,
    private localStorageToken: LocalstorageService,
    private authService: AuthenticationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = this.localStorageToken.getToken();
    // console.log('in right ')

    if (token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      
      if (!this._tokenExpired(tokenDecode.exp)) {
        return true;
      }
    }
    this.router.navigate(['/']);
    return false;
  }

  private _tokenExpired(expiration: number): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }
}
