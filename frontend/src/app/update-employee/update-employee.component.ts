import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { log } from 'console';

interface Department {
  _id: string;
  departmentName: string;
  professions: string[];
}

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.css',
})
export class UpdateEmployeeComponent implements OnInit {
  //updateForm: FormGroup;
  userId: string = '';
  //departments: Department[] = [];
  //availableProfessions: string[] = [];
  errorMessage: string = '';
  //loading: boolean = false;
  updateForm = this.fb.group({
    name: [''],
    department: [''],
    profession: [''],
    salary: [''],
    username: [''],
    password: [''],
    email: [''],
    gender: ['']

  });
  departments: any[] = [];
  availableProfessions: string[] = [];
  currentDepartmentName: string = '';
  loading = false;

  
  constructor(
    private route: ActivatedRoute,
    private userService: AuthentificationService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.updateForm = this.fb.group({
      name: ['', Validators.required],
      profession: ['', Validators.required],
      department: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(0)]],
    username: ['', Validators.required],
    password: ['', Validators.required],
    email: ['', Validators.required],
    gender: ['', Validators.required],

    });
  }
 

  
    ngOnInit(): void {
      // Retrieve the employee ID from the route
      this.userId = this.route.snapshot.paramMap.get('id') || '';
  
      // Fetch departments and load employee data
      this.userService.getDeps().subscribe(
        (departments) => {
          this.departments = departments;
          if (this.userId) {
            this.loadEmployeeData();
          }
        },
        (error) => console.error('Error fetching departments:', error)
      );
    }
  
    loadEmployeeData(): void {
      this.userService.getUserById(this.userId).subscribe(
        (employee) => {
          // Patch the form with employee data
          this.updateForm.patchValue(employee);
  
          // Find the department and set available professions
          const department = this.departments.find(
            (dept) => dept._id === employee.department
          );
          if (department) {
            this.availableProfessions = department.professions;
  
            // Pre-select the profession
            this.updateForm.patchValue({ profession: employee.profession });
          }
        },
        (error) => console.error('Error fetching employee data:', error)
      );
    }
  
  
  
  // Handle department change
  onDepartmentChange(): void {
    
    const selectedDepartmentId = this.updateForm.get('department')?.value;
    const selectedDepartment = this.departments.find(
      (dept) => dept._id === selectedDepartmentId
    );
    
    // Update available professions based on the selected department
    this.availableProfessions = selectedDepartment
      ? selectedDepartment.professions
      : [];
  
    // Reset the profession field when department changes
    this.updateForm.patchValue({ profession: '' });
  }
  
  

  onsubmit(): void {
    if (this.updateForm.valid) {
      this.loading = true;
      this.userService.updateUser(this.userId, this.updateForm.value).subscribe(
        () => {
          this.loading = false;
          alert('Employee updated successfully');
          this.router.navigate(['/test']);
        },
        (error) => {
          this.loading = false;
          this.errorMessage = 'Error updating employee';
          console.error(error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
