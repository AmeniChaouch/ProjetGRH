import { Component } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {
  user:any={};
  constructor(private userService: AuthentificationService,private router: Router){}

  register(){
    console.log("okkk")
    const UserData={
      name: this.user.name,
      position: this.user.position,
      department: this.user.department,
      salary: this.user.salary,
    }
    this.userService.registerEmployee(UserData).subscribe(
      (response)=>{
        console.log(response);
        this.router.navigate(['/test']);
      },
      (error)=>{
        console.error('error',error);
      }
    );
  }

}
