import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  apiUrl = 'http://localhost:8080';

  get(endpoint: string): Observable<any> {
    const url = `${this.apiUrl}${endpoint}`;
    return this.http.get(url);
  }

  put(endpoint: string, data: any): Observable<any> {
    const url = `${this.apiUrl}${endpoint}`;
    return this.http.put(url, data);
  }

  post(endpoint: string, data: any): Observable<any> {
    const url = `${this.apiUrl}${endpoint}`;
    return this.http.post(url, data);
  }

  delete(endpoint: string): Observable<any> {
    const url = `${this.apiUrl}${endpoint}`;
    return this.http.delete(url);
  }

  // exemple d'appel api dans le composant

  // this.api.get(`/calendar`).subscribe((data) => {
  // this.XXXXXXXXData = data; // XXXXXXXX = nom de la variable dans le composant
}
