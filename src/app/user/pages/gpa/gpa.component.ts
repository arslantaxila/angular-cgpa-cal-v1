import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserService } from '../../services/user.service';
import {
  Semester,
} from '../../models/user';
import { timer } from 'rxjs';
@Component({
  selector: 'app-gpa',
  templateUrl: './gpa.component.html',
  styleUrls: ['./gpa.component.scss']
})
export class GpaComponent implements OnInit {
  @ViewChild('fileupload')
  fileupload!: ElementRef;

  courseDisplay = false;
  display: boolean = false;
  Statusdisplay: boolean = false;
  semesters: any[] = []
  grades: any[] = [];
  clickedSemeter: any;
  attachment: any;
  cgpa:any;

  semesterForm!: FormGroup;
  courseForm!: FormGroup;

  course_array: any[] = []
  semester_data: any[] = [];
  rights: any[] = [];

  editPermission = false;
  deletePermission = false;
  viewPermission = false;
  createPermission = false;
  isSubmitted = false;
  isSubmittedSemester = false;
  viewDisplayCase = false;
  editDisplayCase = false;

  constructor(
    private userService: UserService,
    private datePipe: DatePipe,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {
    this.getPermission();
    this._initSemesterForm();
    this.viewDisplayCase = false;
    this._getSemester();
    this._getGrade();
    this._initCourseForm();
    this.courseDisplay = false;
    this.course_array = [];


    this.semester_data = [
      { "id": "Semester 1", "name": "Semester 1" },
      { "id": "Semester 2", "name": "Semester 2" },
      { "id": "Semester 3", "name": "Semester 3" },
      { "id": "Semester 4", "name": "Semester 4" },
      { "id": "Semester 5", "name": "Semester 5" },
      { "id": "Semester 6", "name": "Semester 6" },
      { "id": "Semester 7", "name": "Semester 7" },
      { "id": "Semester 8", "name": "Semester 8" },
      { "id": "Semester 9", "name": "Semester 9" },
      { "id": "Semester 10", "name": "Semester 10" },
      { "id": "Semester 11", "name": "Semester 11" },
      { "id": "Semester 12", "name": "Semester 12" },
      { "id": "Semester 13", "name": "Semester 13" },
      { "id": "Semester 14", "name": "Semester 14" },
      { "id": "Semester 15", "name": "Semester 15" }
    ]

  }


  private _initCourseForm() {
    this.courseForm = this.formBuilder.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      marks: ['', Validators.required],
      credit_hour: ['', Validators.required],
    })
  }

  private _initSemesterForm() {
    this.semesterForm = this.formBuilder.group({
      semester: [
        '',
        Validators.required

      ]
    });
  }

  getPermission() {
    const rightsString = localStorage.getItem('rights');
    // console.log(rightsString)
    if (rightsString) {
      try {
        this.rights = JSON.parse(rightsString);
        const right = this.rights.find(r => r.name === 'gpa-calculation');
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
        // console.error("Failed to parse rights from localStorage", error);
        this.rights = []; // Fallback to an empty array if parsing fails
      }
    }
  }

  showDialog() {
    this.display = true;
    this._initSemesterForm();
    this._initCourseForm();
    this.course_array = [];
    this.courseDisplay = false;
    this.viewDisplayCase = false;
    this.getsemesterform.semester.enable();
    this.editDisplayCase = false;
  }



  onCourseSubmit() {
    this.isSubmitted = true;
    if (this.courseForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Enter the required fields',
      });
      return;
    } else {
      this.courseDisplay = true;
      const result = this.grades.find(grade => this.getcourseform.marks.value >= grade.min && this.getcourseform.marks.value <= grade.max);
      const newRow = {
        name: this.getcourseform.name.value,
        code: this.getcourseform.code.value,
        marks: this.getcourseform.marks.value,
        credit_hour: this.getcourseform.credit_hour.value,
        gpa: result.point
      };

      // Updating the array immutably
      this.course_array = [...this.course_array, newRow];

      this.courseForm.reset();
      this.isSubmitted = false;
    }
  }

  calculateGPA(courses: any[]): number {
    let totalCreditHours = 0;
    let totalWeightedGPA = 0;

    for (const course of courses) {
      totalCreditHours += course.credit_hour;
      totalWeightedGPA += course.credit_hour * course.gpa;
    }

    const overallGPA = totalWeightedGPA / totalCreditHours;
    return overallGPA;
  }

  

  selectAttachment(event: any) {
    if (event.target.files.length > 0) {
      this.attachment = event.target.files[0] as File;
      const maxSizeInBytes = 2242880; // 2MB (you can adjust the size as needed)
      if (this.attachment.size > maxSizeInBytes) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Attachment size exceeds the allowed limit. File be must of maximum 2MB`,
        });
        this.attachment = '';
        return;
      }

      const allowedFileTypes = ['text/csv'];;
      if (!allowedFileTypes.includes(this.attachment.type)) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Attachment type not allowed, only csv.`,
        });

        this.attachment = '';
        return;
      }

      let formData = new FormData();
      formData.append('file', this.attachment);

      this.userService
        .importfile(formData)
        .subscribe(
          (res) => {
            formData = new FormData();
            this.attachment = '';
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: `Successfully Inserted`,
            });
            this.fileupload.nativeElement.value = '';
            this._getSemester();
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

  triggerFileInput() {
    this.fileupload.nativeElement.value = '';
    this.fileupload.nativeElement.click();
  }

  downloadAttachment() {
    this.userService.downloadAttachment().subscribe((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'format.csv'; // Adjust the filename if needed
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }


  onEditSubmit() {
    this.isSubmittedSemester = true;
    if (this.semesterForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Enter the required fields',
      });
      return;
    } else {
      if (this.course_array.length === 0) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Add atleast one course',
        });
        return;
      } else {

        const gpa = this.calculateGPA(this.course_array);

        let semester: Semester = {
          semester: this.semesterForm.value.semester,
          gpa: gpa,
          courses: this.course_array
        } as Semester;

        this.userService.updateSemester(semester, this.clickedSemeter.id).subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: `Semester updated`,
            });
            timer(700)
              .toPromise()
              .then(() => {
                this._getSemester();
                this.display = false;
                this.course_array = [];
                this.isSubmitted = false;
                this.isSubmittedSemester = false;
                this.semesterForm.reset();
                this.courseForm.reset();
                this.editDisplayCase = false;
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
  }

  onSubmit() {
    this.isSubmittedSemester = true;
    if (this.semesterForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Enter the required fields',
      });
      return;
    } else {
      if (this.course_array.length === 0) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Add atleast one course',
        });
        return;
      } else {

        const gpa = this.calculateGPA(this.course_array);

        let semester: Semester = {
          semester: this.semesterForm.value.semester,
          gpa: gpa,
          courses: this.course_array
        } as Semester;

        this.userService.addSemester(semester).subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: `Semester added`,
            });
            timer(700)
              .toPromise()
              .then(() => {
                this._getSemester();
                this.display = false;
                this.course_array = [];
                this.isSubmitted = false;
                this.isSubmittedSemester = false;
                this.semesterForm.reset();
                this.courseForm.reset();
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
  }


  removeVariable(rowData: any) {

    this.confirmationService.confirm({
      message: `Are you sure you want to delete the course?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.course_array = this.course_array.filter((item) => {
          for (const key in rowData) {
            if (item[key] !== rowData[key]) {
              return true; // Keep items that do not match the criteria
            }
          }
          return false; // Filter out items that match the criteria
        });
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


  editSemester(semester: any) {

    this.clickedSemeter = semester;
    this.viewDisplayCase = false;
    this.courseDisplay = true;
    this.editDisplayCase = true;

    this._initCourseForm();
    this._initSemesterForm();
    this.display = true;
    this.userService.getSemesterCourses(semester.id).subscribe((course) => {
      this.getsemesterform.semester.setValue(semester.name);
      this.course_array = course
    })
  }

  viewSemester(semester: any) {
    this.display = true;
    this.viewDisplayCase = true;
    this.courseDisplay = true;
    this.userService.getSemesterCourses(semester.id).subscribe((course) => {
      this.getsemesterform.semester.setValue(semester.name);
      this.getsemesterform.semester.disable();
      this.course_array = course
    })
  }

  deleteSemester(semester: any) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete the semester?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.deleteSemester(semester.id).subscribe(() => {
          this._getSemester();
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

  calculateCGPA(semesters: any[]): number {
    let totalQualityPoints = 0;
    let totalCreditHours = 0;
  
    for (const semester of semesters) {
      totalQualityPoints += semester.gpa * semester.credit_hour;
      totalCreditHours += semester.credit_hour;
    }
  
    return totalCreditHours > 0 ? totalQualityPoints / totalCreditHours : 0;
  }

  private _getSemester() {
    this.userService.getSemester().subscribe((semester) => {
      this.semesters = semester;
      const cgpa = this.calculateCGPA(this.semesters);
      this.cgpa = cgpa.toFixed(3);
    });
  }

  private _getGrade() {
    this.userService.getGrade().subscribe((grade) => {
      this.grades = grade;
    });
  }

  get getDatePipe() {
    return this.datePipe;
  }

  get getcourseform() {
    return this.courseForm.controls;
  }

  get getsemesterform() {
    return this.semesterForm.controls;
  }

}
