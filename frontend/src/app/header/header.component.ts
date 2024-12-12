import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  constructor(private authService1: AuthentificationService) {}
  isAdmin(): boolean {
    return this.authService1.isAdmin();
  }
  username: string = '';
  role: string = '';



  ngOnInit(): void {
    this.username = this.authService1.getUsername();
    this.role=this.authService1.getUserRole();
   


  }

}
