import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '../layout-service/app.layout.service';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { UserService } from '../../user/services/user.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  items!: MenuItem[];

  menuItems: MenuItem[] = [];

  currentUserName: any = '';
  docName: any = 0;
  profileImage: any;
  profilePictureName: any;

  ngOnInit() {
    this.profilePictureName = localStorage.getItem('profilePicture');

    this.menuItems = [
      // {
      //   label: 'Profile',
      //   icon: 'pi pi-user',
      // },
      // {
      //   separator: true,
      // },
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-sign-out',
        command: () => this.logoutUser(),
      },
    ];

    this.service
      .viewImage(this.profilePictureName)
      .subscribe((response: Blob) => {
        this.profileImage = URL.createObjectURL(response);
      });
  }
  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  constructor(
    public layoutService: LayoutService,
    private authService: AuthenticationService,
    private service: UserService,
    public router: Router,
  ) {
    this.currentUserName = localStorage.getItem('name')
      ? localStorage.getItem('name')
      : '';
  }

  // logoutUser() {
  //   this.authService.logout();
  // }

  logoutUser() {
    const currentPath = this.router.url;
     if (currentPath.startsWith('/hrm')) {
      this.authService.logout();
    } else {
      this.authService.logout();
    }
  }
}
