import { Component, ElementRef, Output, EventEmitter } from '@angular/core'
import { LayoutService } from '../layout-service/app.layout.service';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  ActivatedRoute,
  NavigationStart,
  NavigationEnd,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})

export class SidebarComponent {
  @Output() messageEvent = new EventEmitter<string>();


  completeModelname: any[] = []
  completeModel: any[] = [];
  model: any[] = [];
  currentUserRole: any;
  rights: any[] = [];
  OTPStatus: any;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public layoutService: LayoutService,
    private authService: AuthenticationService,
    public el: ElementRef
  ) {

    this.currentUserRole = localStorage.getItem('role');
    const rightsString = localStorage.getItem('rights');
    if (rightsString) {
      try {
        this.rights = JSON.parse(rightsString);
      } catch (error) {
        console.error("Failed to parse rights from localStorage", error);
        this.rights = []; // Fallback to an empty array if parsing fails
      }
    }
  }


  async ngOnInit() {

    this.completeModel = [
      {
        id: 1,
        items: [
          {
            label: 'Dashboard',
            icon: 'dashboard-i.svg',
            routerLink: ['/home'],
          },
        ],
      },

      {
        id: 2,
        items: [
          {
            label: 'Transcript Request',
            icon: 'appraisal-i.svg',
            routerLink: ['/transcript'],
          },
        ],
      },

      {
        id: 3,
        items: [
          {
            label: 'GPA Calculation',
            icon: 'department-i.svg',
            routerLink: ['/gpa-calculation'],
          },
        ],
      },
      {
        id: 4,
        items: [
          {
            label: 'User',
            icon: 'profile-i.svg',
            routerLink: ['/user'],
          },
        ],
      },

  
      {
        id: 6,
        items: [
          {
            label: 'Logout',
            icon: 'signout-i.svg',
            routerLink: ['/logout'],
          },
        ],
      },
    ];

    this.completeModelname = [ 
      { name: "transcript", id: 2 },
      { name: "gpa-calculation", id: 3 },
      { name: "user", id: 4 },
    ]

    this.completeModelname.forEach(model => {
      const right = this.rights.find(r => r.name === model.name);
      if (!right) {
        this.completeModel = this.completeModel.filter(item => item.id !== model.id);
      }
    });

    this.model = this.completeModel;
  }

}
