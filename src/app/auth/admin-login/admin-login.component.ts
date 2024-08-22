import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalstorageService } from '../services/localstorage.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  form!: FormGroup;
  isSubmitted = false;
  authError = false;
  authMessage = 'Email or Password are wrong';
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private localstorageService: LocalstorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._initLoginForm();

    const token = this.localstorageService.getToken();

    if (token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      if (!this._tokenExpired(tokenDecode.exp)) {
        this.router.navigate(['/home']);
      }
    } else {
      // Handle the case when the token is null, for example:
      this.router.navigate(['/admin-login']);
    }

  }

  private _tokenExpired(expiration: number): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }

  private _initLoginForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.form.invalid) return;

    this.authService
      .adminlogin(this.loginForm['email'].value, this.loginForm['password'].value)
      .subscribe(
        (user) => {
          this.authError = false;
          this.localstorageService.setToken(user.token);
          const tokenDecode = JSON.parse(atob(user.token.split('.')[1]));
          localStorage.setItem('id', tokenDecode.id);
          localStorage.setItem('name', tokenDecode.name);
          localStorage.setItem('role', tokenDecode.role);
          localStorage.setItem('email', tokenDecode.email);

          // Assuming tokenDecode.rights is an array
          const rightsArray = tokenDecode.rights; // Replace with your actual array

          // Convert the array to JSON string
          const rightsString = JSON.stringify(rightsArray);

          localStorage.setItem('rights', rightsString);

          // console.log(tokenDecode.rights)
          localStorage.setItem(
            'profilePicture',
            user.photoName
          );
          this.router.navigate(['/home']);
        },
        (error: HttpErrorResponse) => {
          // console.log(error);
          this.authError = true;
          if (error.status !== 401) {

            this.authMessage = 'Error in the Server, please try again later!';

          } else {
            this.authMessage = error.error.message;
          }
        }
      );
  }

  get loginForm() {
    return this.form.controls;
  }
}

