import { Component } from '@angular/core';
import {  OnInit } from '@angular/core';
 import { ActivatedRoute, Router } from '@angular/router'; 
import { AuthentificationService } from '../authentification.service';
import { FormBuilder, FormGroup, Validators ,Form} from '@angular/forms';
import { UserService } from '../user.service';
@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.css'
})
export class UpdateEmployeeComponent {
  updateForm: FormGroup ; 
  userId: string = '';
   loading: boolean = false;
   errorMessage: string = '';

  constructor( private route: ActivatedRoute, private userService: AuthentificationService, private fb: FormBuilder, private router: Router ) 
  { // Initialiser le formulaire avec FormBuilder 
    this.updateForm = this.fb.group({ name: ['', [Validators.required]],
     position: ['', [Validators.required, Validators.email]], 
    department: ['', [Validators.required]],
    salary: ['', [Validators.required]]  }); }

    ngOnInit(): void {
      this.updateForm = this.fb.group({
        name: ['', Validators.required],
        position: ['', Validators.required],
        department: ['', Validators.required],
        salary: ['', [Validators.required, Validators.min(0)]]
      });
    
      this.userId = this.route.snapshot.paramMap.get('id') || '';
      console.log("User ID: " + this.userId);
      
      if (this.userId) {
        this.userService.getUserById(this.userId).subscribe(
          (user) => { 
            this.updateForm.patchValue({ 
              name: user.name, 
              position: user.position,
              department: user.department,
              salary: user.salary
            });
          },
          (error) => { 
            console.error('Erreur lors de la récupération des informations utilisateur', error); 
          }
        );
      }
    }
    // Soumettre le formulaire de mise à jour
    onsubmit(): void {
     
   
        console.log("Méthode onsubmit appelée");
        console.log(this.updateForm.status); // VALID ou INVALID
        console.log(this.updateForm.value);
      
        if (this.updateForm.valid) {
          console.log("Formulaire valide");
          this.loading = true;
          this.userService.updateUser(this.userId, this.updateForm.value).subscribe(
            () => {
              this.loading = false;
              alert('Employee mis à jour avec succès');
              this.router.navigate(['/test']);
            },
            (error) => {
              this.loading = false;
              this.errorMessage = 'Erreur lors de la mise à jour de l\'Employee';
              console.error(error);
            }
          );
        } else {
          console.log("Formulaire invalide");
        }
      }
      
    
}
