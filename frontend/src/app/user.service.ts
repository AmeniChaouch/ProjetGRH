import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl= "http://localhost:3001/api/users";

  
  constructor(private http: HttpClient,private cookieService: CookieService) { }
  
  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/all`);
  }
  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  updateUser(id: string, userData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, userData).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  isTokenValid(token: string): boolean {
    // Validation simple, vérifier la structure JWT ou autre logique d'expiration
    return !!token;
  }

  private handleError(error: any): Observable<never> {
    console.error('API error occurred:', error);
    return throwError('Une erreur est survenue ; veuillez réessayer.');
  }
  registerUser(UserData:any): Observable<any>{
    return this.http.post('http://localhost:3001/api/users/register', UserData,{
      headers:{
        'Content-Type': 'application/json'
      }

    });
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
  getUserRole(): string {
    return this.cookieService.get('role'); 
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'admin';
  }

}
