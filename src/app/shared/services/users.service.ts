import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<any> {
    return this.httpClient.get('http://localhost:3004/users');
  }

  getAllWithCities(): Observable<any> {
    return this.httpClient.get('http://localhost:3004/users/?_expand=city');
  }

  getOneWithCity(id: number) {
    return this.httpClient.get('http://localhost:3004/users/' + id + '?_expand=city');
  }

  add(user: User) {
    return this.httpClient.post('http://localhost:3004/users', user );
  }

  edit(id: number, user: User) {
    return this.httpClient.put('http://localhost:3004/users/' + id, user );
  }

  delete(id: number) {
    return this.httpClient.delete('http://localhost:3004/users/' + id);
  }
}
