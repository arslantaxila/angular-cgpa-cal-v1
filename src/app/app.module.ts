import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { AuthModule } from './auth/auth.module';
import { MenuModule } from 'primeng/menu';
import { AccordionModule } from 'primeng/accordion';
import { DropdownModule } from 'primeng/dropdown';
import { DatePipe } from '@angular/common';
import { AppMenuitemComponent } from './shared/sidebar/app.menuitem.component';
import { SubmenuComponent } from './shared/submenu/submenu.component';
import { JwtInterceptor } from './auth/services/jwt.interceptor';
import { SpinnerService } from 'src/services/spinner.service';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ScrollPanelModule } from 'primeng/scrollpanel';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ShellComponent,
    SidebarComponent,
    AppMenuitemComponent,
    SubmenuComponent,
  ],
  imports: [
    BrowserModule,
    AuthModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MenuModule,
    AccordionModule,
    InputSwitchModule,
    CardModule,
    ButtonModule,
    ScrollPanelModule,
  ],
  providers: [
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
