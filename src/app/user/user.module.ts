import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { AccordionModule } from 'primeng/accordion';
import { TabViewModule } from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { PasswordModule } from 'primeng/password';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { ProgressBarModule } from 'primeng/progressbar';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InputSwitchModule } from 'primeng/inputswitch';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { MultiSelectModule } from 'primeng/multiselect';
import { CheckboxModule } from 'primeng/checkbox';
import { UserComponent } from './pages/user/user.component';
import { TranscriptComponent } from './pages/transcript/transcript.component';
import { GpaComponent } from './pages/gpa/gpa.component';


@NgModule({
  declarations: [
    MyProfileComponent,
    UserComponent,
    TranscriptComponent,
    GpaComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    CardModule,
    ChartModule,
    TableModule,
    TagModule,
    ButtonModule,
    InputTextModule,
    ScrollPanelModule,
    AccordionModule,
    DialogModule,
    TabViewModule,
    DropdownModule,
    FormsModule,
    RadioButtonModule,
    CalendarModule,
    PasswordModule,
    InputMaskModule,
    InputTextareaModule,
    FileUploadModule,
    MessagesModule,
    ToastModule,
    ToolbarModule,
    ConfirmDialogModule,
    HttpClientModule,
    DividerModule,
    InputNumberModule,
    ProgressBarModule,
    InputSwitchModule,
    OrganizationChartModule,
    MultiSelectModule,
    CheckboxModule,
  ],
  providers: [MessageService, ConfirmationService],
})
export class UserModule {}
