import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = 'http://localhost:3000/users'
  constructor(private http : HttpClient) { }

  getUsers():Observable<any>{
    return this.http.get(this.apiUrl);
  }

  deleteById(id:number):Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
