import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LocalstorageService } from './localstorage.service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private localStorageToken: LocalstorageService,
    private location: Location
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = this.localStorageToken.getToken();

    if (token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));

      if (!this._tokenExpired(tokenDecode.exp)) {
        // If the user is an admin or HR, allow access to all routes


        // Assuming tokenDecode.rights is an array
        const rightsArray = tokenDecode.rights; // Replace with your actual array

        if (route.routeConfig?.path != '') {
          const hasValue = rightsArray.find((item: any) => item.name === route.routeConfig?.path);
          // console.log(hasValue)
        
          if (hasValue) {
            return true;
          }else if(route.routeConfig?.path === 'home' || route.routeConfig?.path === 'logout'){
            // console.log(route.routeConfig?.path)
            return true;
          } else {
            this.router.navigate(['/home']);
          }
        } else {
        }
        

        // All other routes are allowed for "employee" users
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
