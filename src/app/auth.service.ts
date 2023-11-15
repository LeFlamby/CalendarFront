import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;

  constructor(private http: HttpClient, private api : ApiService) {
    this.isLoggedIn = !!localStorage.getItem('token');
    this.api.get(`/user`).subscribe((data : any) => {
    }
    );
  }


  login(username: string, password: string) {
    return this.http.post<any>(`http://localhost:8080/login`, { username, password })
      .pipe(tap((data: any) => {
      const response = data.data;
      console.log('@@@@@@@@@response:', response)

        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.isLoggedIn = true;
        }
        return response;
      }));
  };

  register({ username, password }: { username: string, password: string}) {
    return this.http.post<any>(`http://localhost:8080/register`, { username, password })
      .pipe(tap((data: any) => {
        const response = data.data;
        if (response && response.token) {
          localStorage.setItem('token', response.token);
        }
        return data;
      }))
  }

  onSignOut() {
    localStorage.removeItem('token');
    window.location.reload();
  }

  getUserData(): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/user/`)
      .pipe((data: any) => {
        return data;
    
      });
  }
}


