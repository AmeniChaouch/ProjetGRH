import { Component } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  
  users: any[] = [];
  constructor(private UserService: AuthentificationService) {}

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
