import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ListUsersComponent } from './list-users/list-users.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { TestComponent } from './test/test.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { CalendrierComponent } from './calendrier/calendrier.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerToggle } from '@angular/material/datepicker';  // Pour le toggle du datepicker
import { MatNativeDateModule } from '@angular/material/core';
import { ListAbsenceComponent } from './list-absence/list-absence.component';
import { AccueilComponent } from './accueil/accueil.component';
import { Login1Component } from './login1/login1.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ListUsersComponent,
    UpdateUserComponent,
    HomeComponent,
    HeaderComponent,
    TestComponent,
    AddEmployeeComponent,
    UpdateEmployeeComponent,
    CalendrierComponent,
    ListAbsenceComponent,
    AccueilComponent,
    Login1Component,
    SubscribeComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDatepickerModule, // Module du datepicker
    MatNativeDateModule, // Module de l'adaptateur natif
    MatFormFieldModule,  // Module pour les champs de formulaire
    
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    
  ],
  providers: [
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
