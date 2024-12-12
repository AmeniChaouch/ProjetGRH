import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private http: HttpClient,private cookieService: CookieService) { }


///department
apiUrl_dep= "http://localhost:3001/api/departments";

addDepartment(depData: any): Observable<any> {
  return this.http.post(this.apiUrl_dep, depData, {
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


getDeps(): Observable<any> {
  return this.http.get<any>(`${this.apiUrl_dep}`);
}
getDepById(id: string): Observable<any> {
  return this.http.get<any>(`${this.apiUrl_dep}/${id}`)
}

updateDep(id: string, userData: any): Observable<any> {
  return this.http.put<any>(`${this.apiUrl_dep}/${id}`, userData)
  }

deleteDep(id: string): Observable<any> {
  return this.http.delete<any>(`${this.apiUrl_dep}/${id}`)

}

///////user

apiUrl= "http://localhost:3001/api/users";

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
      console.error('Login error:', error.message || error);
        return throwError(() => new Error('Login failed. Please try again.'));
    })
  );
  }

 

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
 
  getUserRole(): string {
    return this.cookieService.get('role'); 
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'admin';
  }
  private username: string = '';

 
  getUsername(): string {
    return this.cookieService.get('username'); 
  }

  
  ///////////absence
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
  getAbsencesbyDate(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl2}/absences`);
  }
 

  getAbsencesByDay(): Observable<any> {
    let url = `${this.apiUrl2}/countByActiveDays`;
    return this.http.get<any>(url);
  }

}
