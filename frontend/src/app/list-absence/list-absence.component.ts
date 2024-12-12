import { Component } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
@Component({
  selector: 'app-list-absence',
  templateUrl: './list-absence.component.html',
  styleUrl: './list-absence.component.css'
})
export class ListAbsenceComponent {
  users: any[] = [];

  constructor(private UserService: AuthentificationService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }
  fetchUsers(): void {
    this.UserService.getAbsences().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des absences', error);
      }
    );
  }
 
  getUsers(): void {
    this.UserService.getAbsences().subscribe((data: any[]) => {
      this.users = data;
    });
  }
  onDeleteUser(userId: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet absence ?')) {
      this.UserService.deleteAbsences(userId).subscribe(() => {
        alert('Utilisateur supprimé avec succès');
        this.fetchUsers(); // Mettre à jour la liste après la suppression
      }, (error: any) => {
        console.error('Erreur lors de la suppression de l\'absence', error);
        alert('Une erreur est survenue lors de la suppression.');
      });
    }
  }

}
