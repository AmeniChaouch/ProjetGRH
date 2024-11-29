import { Component } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string ='';

  password: string ='';


  constructor(private userService: AuthentificationService,private user1Service: UserService, private router : Router,private cookieService: CookieService) {}



  loginUser(email: string, password: string): void {
    this.userService.loginUser(email, password).subscribe(
      (response) => {
        console.log('API Response:', response);
        
        const token = response?.token;
        const role = response?.role;

        if (token) {
          const cookieExpirationDays = 7;
          this.cookieService.set('token', token, cookieExpirationDays, '/', '', true, 'Strict');
          this.cookieService.set('role', role, cookieExpirationDays, '/', '', true, 'Strict');

          alert("Bienvenue");

          if (this.user1Service.isTokenValid(token)) {
            this.router.navigate(['/home']);
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
