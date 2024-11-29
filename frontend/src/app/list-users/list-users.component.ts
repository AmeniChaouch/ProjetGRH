import { Component,OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css'
})
export class ListUsersComponent implements OnInit{

  users: any[] = [];

  constructor(private UserService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.UserService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des utilisateurs', error);
      }
    );
  }
  getUsers(): void {
    this.UserService.getUsers().subscribe((data: any[]) => {
      this.users = data;
    });
  }
  onDeleteUser(userId: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.UserService.deleteUser(userId).subscribe(() => {
        alert('Utilisateur supprimé avec succès');
        this.getUsers(); // Mettre à jour la liste après la suppression
      }, (error: any) => {
        console.error('Erreur lors de la suppression de l\'utilisateur', error);
        alert('Une erreur est survenue lors de la suppression.');
      });
    }
  }
  
}



