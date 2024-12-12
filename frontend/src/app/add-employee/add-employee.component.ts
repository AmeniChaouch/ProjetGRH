import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { Router } from '@angular/router';
interface Department {
  _id: string; // _id from MongoDB
  departmentName: string;
  professions: string[];
}
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent implements OnInit{
  
  
  user:any={};
  departments: Department[] = []; // Typed as an array of Department objects
  availableProfessions: string[] = [];

  
  constructor(private userService: AuthentificationService,private router: Router){}
  ngOnInit(): void {
 // Fetch the list of departments and professions
 this.userService.getDeps().subscribe(
  (data: any[]) => {
    this.departments = data; // Assuming `data` is an array of departments
  },
  (error) => {
    console.error('Failed to fetch departments', error);
  }
);  }

  register(){
    console.log("okkk")
    const UserData={
      username:this.user.username,
      email:this.user.email, 
      password:this.user.password,
      role:"employee",
      name: this.user.name,
      profession: this.user.profession,
      department: this.user.department,
      salary: this.user.salary,
      gender: this.user.gender

    }
    this.userService.registerUser(UserData).subscribe(
      (response)=>{
        console.log(response);
        this.router.navigate(['/test']);
      },
      (error)=>{
        console.error('error',error);
      }
    );
  }
  onDepartmentChange(): void {
    const selectedDepartment = this.departments.find(
      (dept) => dept.departmentName === this.user.department
    );
    this.availableProfessions = selectedDepartment
      ? selectedDepartment.professions
      : [];
    this.user.department = selectedDepartment?._id; // Assign the department's ObjectId
  }
  
}
