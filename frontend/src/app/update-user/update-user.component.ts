import { Component } from '@angular/core';
import {  OnInit } from '@angular/core';
 import { ActivatedRoute, Router } from '@angular/router'; 
import { AuthentificationService } from '../authentification.service';
import { FormBuilder, FormGroup, Validators ,Form} from '@angular/forms';
import { UserService } from '../user.service';
@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent implements OnInit{
  updateUserForm: FormGroup ; 
  userId: string = '';
   loading: boolean = false;
   errorMessage: string = '';

  constructor( private route: ActivatedRoute, private userService: UserService, private fb: FormBuilder, private router: Router ) 
  { // Initialiser le formulaire avec FormBuilder 
    this.updateUserForm = this.fb.group({ username: ['', [Validators.required]],
     email: ['', [Validators.required, Validators.email]], 
    role: ['', [Validators.required]] }); }

    ngOnInit(): void {  
      this.userId ;
      this.route.snapshot.paramMap.get('id') || '';
      if (this.userId) { this.userService.getUserById(this.userId).subscribe((user) => 
        { this.updateUserForm.patchValue({ username: user.username, email: user.email, role: user.role }); },
       (error) => { console.error('Erreur lors de la récupération des informations utilisateur', error); } );
       throw new Error('Method not implemented.');
}}
// Soumettre le formulaire de mise à jour
      onsubmit(): void {
   if (this.updateUserForm.valid) {
   this.loading = true;
   this.userService.updateUser(this.userId, this.updateUserForm.value).subscribe( () => { this.loading = false; alert('Utilisateur mis à jour avec succès');
    this.router.navigate(['/listusers']); },

      (error) => { this.loading = false; this.errorMessage = ('Erreur lors de la mise à jour de lutilisateur'); 
console.error(error); } ); 
}
      
}
    
}
    

