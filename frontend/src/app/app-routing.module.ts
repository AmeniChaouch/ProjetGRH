import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './auth.guard';
import { HeaderComponent } from './header/header.component';
import { TestComponent } from './test/test.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { CalendrierComponent } from './calendrier/calendrier.component';
import { ListAbsenceComponent } from './list-absence/list-absence.component';
import { AccueilComponent } from './accueil/accueil.component';
import { Login1Component } from './login1/login1.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
const routes: Routes = [
  {path:'register', component: RegisterComponent},
  {path:'users/update/:id',component: UpdateUserComponent},
  {path:'listusers',component: ListUsersComponent},
  {path:'login', component: LoginComponent},
  {path:'home', component: HomeComponent,canActivate:[authGuard]},
  {path:'test', component: TestComponent},
  {path:'header', component: HeaderComponent},
  {path:'employee-add', component: AddEmployeeComponent},
  {path:'employee-update/:id', component: UpdateEmployeeComponent},
  {path:'absences-list', component: ListAbsenceComponent},
  {path:'calendrier', component: CalendrierComponent},
  {path:'', component: AccueilComponent},
  {path:'login1', component: Login1Component},
  {path:'subscribe', component: SubscribeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
