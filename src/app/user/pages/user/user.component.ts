import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserService } from '../../services/user.service';
import {
  User
} from '../../models/user';
import { timer } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  display: boolean = false;
  enrollmentrequired = false;
  users: any[] = []

  UserForm!: FormGroup;

  roles: any[] = [];
  rights: any[] = [];

  editPermission = false;
  deletePermission = false;
  viewPermission = false;
  createPermission = false;


  isSubmitted = false;
  clickedUser: any;
  editCasedisplay = false;

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {
    this._getUser();
    this.getPermission();
    this._initUserForm();
    this.editCasedisplay = false;
    this.enrollmentrequired = false;

    this.roles = [
      { "id": 2, "name": "Admin" },
      { "id": 3, "name": "Student" },

    ]
  }

  private _initUserForm() {
    this.UserForm = this.formBuilder.group({
      name: [
        '',
        Validators.required

      ],
      role: [
        '',
        Validators.required

      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
          ),
        ],
      ],
      email: [
        '', [Validators.required, Validators.email]
      ],
      enrollment: [
        '',
        Validators.required

      ]
    });
  }


  getPermission() {
    // console.log('in p')
    const rightsString = localStorage.getItem('rights');
    if (rightsString) {
      try {
        this.rights = JSON.parse(rightsString);
        // console.log(this.rights)
        const right = this.rights.find(r => r.name === 'user');
        if (right.create === 'yes') {
          this.createPermission = true;
        } else {
          this.createPermission = false;
        }

        if (right.read === 'yes') {
          this.viewPermission = true;
        } else {
          this.viewPermission = false;
        }


        if (right.update === 'yes') {
          this.editPermission = true;
        } else {
          this.editPermission = false;

        }

        if (right.delete === 'yes') {
          this.deletePermission = false;
        } else {
          this.deletePermission = false;

        }

      } catch (error) {
        console.error("Failed to parse rights from localStorage", error);
        this.rights = []; // Fallback to an empty array if parsing fails
      }
    }
  }


  _getUser() {
    this.userService.getUser().subscribe((users) => {
      this.users = users;
      // console.log(users)
    });
  }

  editUser(user: any) {
    this.isSubmitted = false;
    this.clickedUser = user;
    this.editCasedisplay = true;
    this._initUserForm();
    this.display = true;
    console.log(user.enrollment)
    this.getuserform.name.setValue(user.name);
    this.getuserform.email.setValue(user.email);
    this.getuserform.enrollment.setValue(user.enrollment);
    // console.log(user.role_id)
    this.getuserform.role.setValue(user.role_id);
  }

  rolechange(event: any) {
    if (event.value == 2) {
      console.log(event)
      this.getuserform.enrollment.setValidators([]);
      this.getuserform.enrollment.updateValueAndValidity();
      this.enrollmentrequired = true;
    } else {
      this.getuserform.enrollment.setValidators([Validators.required]);
      this.getuserform.enrollment.updateValueAndValidity();
      this.enrollmentrequired = false;
    }
  }


  updateUser() {

    if (this.UserForm.value.password == '') {
      this.getuserform.password.setValidators([]);
      this.getuserform.password.updateValueAndValidity();
    } else {
      this.getuserform.password.setValidators([
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        ),
      ]);
      this.getuserform.password.updateValueAndValidity();
    }

    this.isSubmitted = true;

    if (this.UserForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Enter the required fields',
      });
      return;
    } else {
      let user: User = {
        name: this.UserForm.value.name,
        email: this.UserForm.value.email,
        password: this.UserForm.value.password,
        enrollment: this.UserForm.value.enrollment,
        role: this.UserForm.value.role
      } as User;

      this.userService.updateUser(user, this.clickedUser.id).subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `User updated`,
          });
          timer(700)
            .toPromise()
            .then(() => {
              this._getUser();
              this.display = false;
              this.isSubmitted = false;
              this.UserForm.reset();
              this.editCasedisplay = false;

            });
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error.message,
          });
        }
      );
    }
  }

  addUser() {
    this.isSubmitted = true;
    if (this.UserForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Enter the required fields',
      });
      return;
    } else {
      let user: User = {
        name: this.UserForm.value.name,
        email: this.UserForm.value.email,
        password: this.UserForm.value.password,
        role: this.UserForm.value.role,
        enrollment: this.UserForm.value.enrollment
      } as User;

      this.userService.addUser(user).subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `User created`,
          });
          timer(700)
            .toPromise()
            .then(() => {
              this._getUser();
              this.display = false;
              this.isSubmitted = false;
              this.UserForm.reset();
            });
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error.message,
          });
        }
      );
    }
  }

  deleteUser(user: any) {
    //ignore
  }

  showDialog() {
    this.display = true;
    this.editCasedisplay = false;
    this._initUserForm();
  }

  get getuserform() {
    return this.UserForm.controls;
  }
}
