import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './services/api.service'; 
import { LoginComponent } from './components/login/login.component';

import { HttpApiInterceptor } from './core/interceptors/http-api.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CalendarComponent } from './components/calendar/calendar.component';
import { RegisterComponent } from './components/register/register.component';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { HeaderComponent } from './components/header/header.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { SidebarModule } from 'primeng/sidebar';







@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CalendarComponent,
    RegisterComponent,
    HeaderComponent,
  
  ],
  imports: [
    BrowserModule,
    FullCalendarModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    DividerModule,
    BrowserAnimationsModule,
    ButtonModule,
    InputTextModule,
    TabMenuModule,
    SidebarModule,


  ],
  providers: [
    ApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpApiInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
