import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.css']
})
export class CalendrierComponent implements OnInit {
  currentDate: Date = new Date();
  currentMonth: Date = new Date();
  weekDays: string[] = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  daysInMonth: { date: number | null, day: number }[] = [];
  
  selectedDate: Date | undefined; // Variable pour stocker la date sélectionnée
  user = {
    employee_id: '' // Cette variable sera liée au champ de l'ID employé
  };
  employeeId: string = '';          // ID de l'employé

  ngOnInit(): void {
    this.generateCalendar();
  }

 
  


  constructor(private http: HttpClient) {}

  // Fonction appelée lorsque l'on clique sur "Enregistrer l'absence"
  saveAbsence() {
    const absenceData = {
      employeeId: this.user.employee_id,
      date: this.selectedDate
    };

    // Envoi de la date et de l'ID employé au backend pour l'enregistrement dans la base de données
    this.http.post('http://localhost:3001/api/absences/save-date', absenceData)
      .subscribe(response => {
        console.log('Absence enregistrée avec succès:', response);
      }, error => {
        console.error('Erreur lors de l\'enregistrement de l\'absence:', error);
      });
  }

  generateCalendar(): void {
    const firstDayOfMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), 1);
    const lastDayOfMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 0);

    const startDay = firstDayOfMonth.getDay();
    const totalDays = lastDayOfMonth.getDate();

    this.daysInMonth = [];
    for (let i = 1 - startDay; i <= totalDays; i++) {
      if (i > 0) {
        this.daysInMonth.push({ date: i, day: new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), i).getDay() });
      } else {
        this.daysInMonth.push({ date: null, day: (i + 7) % 7 });
      }
    }
  }
 

  previousMonth(): void {
    this.currentMonth.setMonth(this.currentMonth.getMonth() - 1);
    this.generateCalendar();
  }

  nextMonth(): void {
    this.currentMonth.setMonth(this.currentMonth.getMonth() + 1);
    this.generateCalendar();
  }

  selectDate(day: { date: number | null, day: number }): void {
    if (day.date) {
      this.selectedDate = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), day.date);
    }
  }
}
