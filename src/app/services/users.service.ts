import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDTO } from '../model/user-dto';
import { baseUrl } from '../app.module';
import { Observable } from 'rxjs';
import { UserRequest } from '../model/user-request';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getById(id: number | string): Observable<UserDTO>{
    return this.http.get<UserDTO>(`${baseUrl}/users/${id}`)
  }

  update(id: number, userRequest: UserRequest): Observable<UserDTO>{
    return this.http.put<UserDTO>(`${baseUrl}/users/${id}`, userRequest)
  }
}
