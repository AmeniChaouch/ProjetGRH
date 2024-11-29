import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private http: HttpClient,private cookieService: CookieService) { }

  registerUser(UserData:any): Observable<any>{
    return this.http.post('http://localhost:3001/api/users/register', UserData,{
      headers:{
        'Content-Type': 'application/json'
      }

    });
  }
  registerEmployee(UserData: any): Observable<any> {
    return this.http.post('http://localhost:3001/api/employees', UserData, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(
      catchError(error => {
        console.error('Une erreur s\'est produite lors de l\'enregistrement de l\'employé:', error);
        return throwError(error);
      })
    );
  }
  isTokenValid(token: string): boolean {
    // Placeholder validation logic (e.g., expiration check)
    return !!token;
  }
  loginUser(email:string,password:string): Observable<any>{
  const url ='http://localhost:3001/api/users/login-user'
    const body={
    email:email,password:password
  };
  return this.http.post<any>(url,body).pipe(
    catchError((error)=>{
      console.error('error',error);
      return throwError('eeddddd');
    })
  );
  }
  apiUrl= "http://localhost:3001/api/employees";

  
  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }
  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`)
  }

  updateUser(id: string, userData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, userData)
    }
  handleError(handleError: any): import("rxjs").OperatorFunction<any, any> {
    throw new Error('Method not implemented.');
  }
 
  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`)
  
  }
  apiUrl2= "http://localhost:3001/api/absences";
  getAbsences(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl2}`);
  }
  getAbsencesById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl2}/${id}`)
  }

  updateAbsences(id: string, userData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl2}/${id}`, userData)
    }
  handleAbsences(handleError: any): import("rxjs").OperatorFunction<any, any> {
    throw new Error('Method not implemented.');
  }
 
  deleteAbsences(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl2}/${id}`)
  
  }
 

}
