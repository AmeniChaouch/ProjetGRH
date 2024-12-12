import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { HeaderComponent } from './header/header.component';
import { TestComponent } from './test/test.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { CalendrierComponent } from './calendrier/calendrier.component';
import { ListAbsenceComponent } from './list-absence/list-absence.component';

import { AddDepartmentComponent } from './add-department/add-department.component';
import { UpdateDepartmentComponent } from './update-department/update-department.component';
import { ListDepartmentComponent } from './list-department/list-department.component';

import { AccueilComponent } from './accueil/accueil.component';
import { Login1Component } from './login1/login1.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [


  {path:'', component: AccueilComponent},


  {path:'login1', component: Login1Component},


  {path:'dashboard', component: DashboardComponent, canActivate: [authGuard]},



  {path:'employees', component: TestComponent, canActivate: [authGuard]},
  {path:'employee-add', component: AddEmployeeComponent, canActivate: [authGuard]},
  {path:'employee-update/:id', component: UpdateEmployeeComponent, canActivate: [authGuard]},


  {path:'absences-list', component: ListAbsenceComponent},
  {path:'calendrier', component: CalendrierComponent, canActivate: [authGuard]},



  {path:'dep-add', component: AddDepartmentComponent, canActivate: [authGuard]},
  {path:'dep-update/:id', component: UpdateDepartmentComponent, canActivate: [authGuard]},
  {path:'dep-list', component: ListDepartmentComponent, canActivate: [authGuard]},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
