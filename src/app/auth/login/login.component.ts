import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalstorageService } from '../services/localstorage.service';
import { AuthenticationService } from '../services/authentication.service';
import { User } from 'src/app/user/models/user';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  isSubmitted = false;
  authError = false;
  display = false;
  authMessage = 'Email or Password are wrong';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private localstorageService: LocalstorageService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._initSignupForm();
    this.display = true;

    const token = this.localstorageService.getToken();

    if (token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      if (!this._tokenExpired(tokenDecode.exp)) {
        this.router.navigate(['/home']);
      }
    } else {
      // Handle the case when the token is null, for example:
      this.router.navigate(['/']);
    }

  }

  private _tokenExpired(expiration: number): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }

  private _initSignupForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      cnic: [
        '',
        [
          Validators.required,
          Validators.minLength(13),
          Validators.maxLength(13),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      enrollment: [
        '',
        Validators.required

      ]
    });
  }

  onSignupClick() {
    this.display = false;
    this.authError = false;
    this.isSubmitted = false;
    this._initSignupForm();
    this.SignupForm.password.setValidators([
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
      ),
    ]);
    this.SignupForm.password.updateValueAndValidity();
  }

  onSigninClick() {
    this.display = true;
    this.isSubmitted = false;
    this._initSignupForm();
    this.SignupForm.password.setValidators([]);
    this.SignupForm.password.updateValueAndValidity();
  }

  onSignupSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) return;
    let userValues: User = { ...this.form.value };

    this.authService.userSignup(userValues).subscribe(
      (user) => {
        this.authError = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Successfully Signup`,
        });
        this.display = true;
        this.isSubmitted = false;
        this._initSignupForm();
        this.SignupForm.password.setValidators([]);
        this.SignupForm.password.updateValueAndValidity();
      },
      (error: HttpErrorResponse) => {
        // console.log(error);
        this.authError = true;
        if (error.status !== 401) {
          console.log(error)
          if (error.error.message === "Email & Enrollment ID must be a Unique") {
            this.authMessage = error.error.message;

          } else {
            this.authMessage = 'Error in the Server, please try again later!';
          }
        } else {
          this.authMessage = error.error.message;
        }
      }
    );
  }

  onLoginSubmit() {
    this.isSubmitted = true;

    if (this.SignupForm['name'].value == '') {
      this.SignupForm.name.setValidators([]);
      this.SignupForm.name.updateValueAndValidity();
    }

    if (this.SignupForm['email'].value == '') {
      this.SignupForm.email.setValidators([]);
      this.SignupForm.email.updateValueAndValidity();
    }

    if (this.SignupForm['cnic'].value == '') {
      this.SignupForm.cnic.setValidators([]);
      this.SignupForm.cnic.updateValueAndValidity();
    }

    if (this.SignupForm['password'].value == '') {
      this.SignupForm.password.setValidators([Validators.required]);
      this.SignupForm.password.updateValueAndValidity();
    }

    if (this.form.invalid) return;

    this.authService
      .login(
        this.SignupForm['enrollment'].value,
        this.SignupForm['password'].value
      )
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

  get SignupForm() {
    return this.form.controls;
  }
}
