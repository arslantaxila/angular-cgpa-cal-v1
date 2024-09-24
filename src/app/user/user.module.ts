import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { DropdownModule } from 'primeng/dropdown';
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
import { DialogModule } from 'primeng/dialog';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { ConfirmationService, MessageService } from 'primeng/api';
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
    TableModule,
    ButtonModule,
    InputTextModule,
    ScrollPanelModule,
    DialogModule,
    DropdownModule,
    FormsModule,
    CalendarModule,
    PasswordModule,
    InputMaskModule,
    InputTextareaModule,
    FileUploadModule,
    MessagesModule,
    ToastModule,
    ToolbarModule,
    ConfirmDialogModule,
    HttpClientModule
  ],
  providers: [MessageService, ConfirmationService],
})
export class UserModule {}
