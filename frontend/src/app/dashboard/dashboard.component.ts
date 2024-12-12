import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import {Chart} from 'chart.js/auto';
import { AuthentificationService } from '../authentification.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  public chart: any;
  absences: { _id: string; count: number }[] = [];
  DateAbsence: number=0;
  daysWithAbsences: number = 0;
  totalAbsences: number = 0;
  absenceDetails: { _id: string, count: number }[] = [];
  Absences: number = 0;
endDate: string | undefined;
  ngOnInit(): void {
    this.loadAbsenceData();
  }
 /* loadAbsenceData(): void {
    this.absenceService.getAbsencesByDay().subscribe({
      next: (data) => {
        this.daysWithAbsences = data.daysWithAbsences;
        this.totalAbsences = data.totalAbsences;
        this.absenceDetails = data.details;
        console.log('Données reçues :', data); // Debugging
      
      

    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
                 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
           datasets: [
          {
            label: "Sales",
            data: ['467','576', '572', '79', '92',
                                 '574', '573', '576'],
            backgroundColor: 'blue'
          },
          {
            label: "Profit",
            data: ['542', '542', '536', '327', '17',
                                     '0.00', '538', '541'],
            backgroundColor: 'limegreen'
          }  
        ]
      },
      options: {
        aspectRatio:2.5
      }

    });},
    error: (err) => {
      console.error('Erreur lors de la récupération des données :', err);
    }
  });*/
  loadAbsenceData(): void {
    this.absenceService.getAbsencesByDay().subscribe({
      next: (data) => {
        console.log('Données reçues depuis le backend :', data.daysWithAbsences);
        this.DateAbsence=data.daysWithAbsences;
        this.Absences=data.totalAbsences;
        const labels = data.details.map((detail: any) => detail._id); // Dates
        const counts = data.details.map((detail: any) => detail.count); // Counts
        this.createChart(labels, counts);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des données :', err);
      }
    });
  }

  createChart(labels: string[], dataCounts: number[]): void {
    this.chart = new Chart("MyChart", {
      type: 'bar', // Type de graphique
      data: {
        labels: labels, // X-axis (dates des absences)
        datasets: [
          {
            label: "Nombre d'absences",
            data: dataCounts, // Y-axis (nombre d'absences par date)
            backgroundColor: 'blue'
          }
        ]
      },
      options: {
        aspectRatio: 2.5,
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Dates'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Nombre d\'absences'
            },
            beginAtZero: true
          }
        }
      }
    });
  }
  



 

 
  constructor(private http: HttpClient,private absenceService:AuthentificationService) {}
 
 
 
 
 

  

}

 

