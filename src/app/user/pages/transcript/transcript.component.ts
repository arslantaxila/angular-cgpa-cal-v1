import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserService } from '../../services/user.service';
import {
  Status,
  Transcript,
} from '../../models/user';
import { timer } from 'rxjs';

@Component({
  selector: 'app-transcript',
  templateUrl: './transcript.component.html',
  styleUrls: ['./transcript.component.scss']
})
export class TranscriptComponent implements OnInit {

  display: boolean = false;
  Statusdisplay: boolean = false;
  transcripts: any[] = []
  clickedTranscript: any;

  TranscriptForm!: FormGroup;
  ChangeForm!: FormGroup;


  types: any[] = [];
  status: any[] = []
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
    private datePipe: DatePipe,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {
    this.getPermission();
    this._initTranscriptForm();
    this.editCasedisplay = false;
    this._getTranscripts();
    this._initChangeForm();

    this.types = [
      { "id": "Interim Transcript", "name": "Interim Transcript" },
      { "id": "Final Transcript", "name": "Final Transcript" },
    ]

    this.status = [
      {
        id: "Pending", name: "Pending"
      },
      {
        id: "Underprocess", name: "Underprocess"
      },

      {
        id: "Ready to Collect", name: "Ready to Collect"
      },
      {
        id: "Complete", name: "Complete"
      }
    ]
  }
  

  private _initChangeForm(){
    this.ChangeForm = this.formBuilder.group({
      status: [
        '',

        Validators.required

      ]
    })
  }

  private _initTranscriptForm() {
    this.TranscriptForm = this.formBuilder.group({
      type: [
        '',
        Validators.required

      ],
      mobile: [
        '',
        Validators.required

      ],
      email: [
        '', [Validators.required, Validators.email]
      ],

      cnic: [
        '',
        [
          Validators.required,
          Validators.minLength(13),
          Validators.maxLength(13),
        ],
      ],
    });
  }

  getPermission() {
    const rightsString = localStorage.getItem('rights');
    console.log(rightsString)
    if (rightsString) {
      try {
        this.rights = JSON.parse(rightsString);
        const right = this.rights.find(r => r.name === 'transcript');
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
          this.deletePermission = true;
        } else {
          this.deletePermission = false;

        }

      } catch (error) {
        console.error("Failed to parse rights from localStorage", error);
        this.rights = []; // Fallback to an empty array if parsing fails
      }
    }
  }

  showDialog() {
    this.display = true;
    this.editCasedisplay = false;
    this._initTranscriptForm();
  }

  addTranscript() {
    this.isSubmitted = true;
    if (this.TranscriptForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Enter the required fields',
      });
      return;
    } else {

      
      let transcript: Transcript = {
        type: this.TranscriptForm.value.type,
        mobile: this.TranscriptForm.value.mobile.replace(/[^a-zA-Z0-9]/g, ''),
        email: this.TranscriptForm.value.email,
        cnic: this.TranscriptForm.value.cnic,
      } as Transcript;

      this.userService.addTranscript(transcript).subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Transcript Request created`,
          });
          timer(700)
            .toPromise()
            .then(() => {
              this._getTranscripts();
              this.display = false;
              this.isSubmitted = false;
              this.TranscriptForm.reset();
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

  changeStatus(transcript: any){
    this.Statusdisplay = true;
    this.clickedTranscript = transcript
  }

  deleteTranscript(transcript: any){
    this.clickedTranscript = transcript
    this.confirmationService.confirm({
      message: `Are you sure you want to delete the transcript request?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.deleteTranscript(transcript.id).subscribe(() => {
          this._getTranscripts();
        })
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Delete Cancelled!',
        });
      },
    });
  }

  
  changeStatusSubmit() {

    this.isSubmitted = true;
    if (this.ChangeForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Enter the required fields',
      });
      return;
    } else {
      let status: Status = { status: this.ChangeForm.value.status, } as Status
      this.userService.updateTranscriptStatus(status, this.clickedTranscript.id).subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Status changed`,
        });
        timer(700)
          .toPromise()
          .then(() => {
            this._getTranscripts();
            this.Statusdisplay = false;
            this.ChangeForm.reset();
            this.isSubmitted = false
          });
      }, (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.message,
        });
      })
    }
  }

  private _getTranscripts() {
    const role = Number(localStorage.getItem('role'));
    if(role == 1 || role == 2){
      //superadmin
      this.userService.getTranscript().subscribe((transcripts) => {
        this.transcripts = transcripts;
      });
    }else{
      this.userService.getMyTranscript().subscribe((transcripts) => {
        this.transcripts = transcripts;
      });
    }
  }

  get getDatePipe() {
    return this.datePipe;
  }

  get getChangeStatus() {
    return this.ChangeForm.controls;
  }

  get gettranscriptform() {
    return this.TranscriptForm.controls;
  }

}
