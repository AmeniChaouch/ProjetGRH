import { Component } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login1',
  templateUrl: './login1.component.html',
  styleUrl: './login1.component.css'
})
export class Login1Component {
  email: string ='';

  password: string ='';

  user:any={};

  

  constructor(private userService: AuthentificationService, private router : Router,private cookieService: CookieService) {}



  submit(): void {
   const  UserData={
      email:this.user.email,
      password:this.user.password
    };
    this.userService.loginUser(UserData.email,UserData.password).subscribe(
      (response) => {
        console.log('API Response:', response);
        
        const token = response?.token;
        const role = response?.role;
        const username = response?.username; // Assuming the API sends the username

        if (token) {
          const cookieExpirationDays = 7;
          this.cookieService.set('token', token, cookieExpirationDays, '/', '', true, 'Strict');
          this.cookieService.set('role', role, cookieExpirationDays, '/', '', true, 'Strict');
          this.cookieService.set('username', username, cookieExpirationDays, '/', '', true, 'Strict');
          alert("Bienvenue");

          if (this.userService.isTokenValid(token)) {
           if(this.userService.getUserRole() == "admin"){
            this.router.navigate(['/dashboard']);
            }else{
              this.router.navigate(['/acceuil']);

            }
          } else {
            alert("Token invalide, veuillez réessayer.");
          }
        } else {
          alert("Token manquant dans la réponse.");
        }
      },
      (error) => {
        console.error('Erreur de connexion :', error);
        alert("Erreur lors de la connexion. Vérifiez vos informations et réessayez.");
      }
    );
  }
}
