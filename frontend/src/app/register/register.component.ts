import { Component } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user:any={};
  constructor(private userService: AuthentificationService,private router: Router){}

  register(){
    console.log("okkk")
    const UserData={
      username: this.user.username,
      email: this.user.email,
      password: this.user.password,
      role: this.user.role,
    }
    this.userService.registerUser(UserData).subscribe(
      (response)=>{
        console.log(response);
        this.router.navigate(['/']);
      },
      (error)=>{
        console.error('error',error);
      }
    );
  }
}
