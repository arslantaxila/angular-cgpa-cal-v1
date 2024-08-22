import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { InputMaskModule } from 'primeng/inputmask';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TabViewModule } from 'primeng/tabview';
import { AccordionModule } from 'primeng/accordion';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';



@NgModule({
  declarations: [LoginComponent, AdminLoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ButtonModule,
    CheckboxModule,
    ConfirmDialogModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    InputMaskModule,
    ScrollPanelModule,
    TabViewModule,
    AccordionModule,
    ToastModule
  ],
  providers: [MessageService, ConfirmationService],

})
export class AuthModule {}
