import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../model/login-request';
import { UserDTO } from '../model/user-dto';
import { baseUrl } from '../app.module';
import { ActivationRequest } from '../model/activation-request';
import { UserRequest } from '../model/user-request';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient ) { }

  login(loginRequest: LoginRequest): Observable<UserDTO>{
    return this.http.post<UserDTO>(`${baseUrl}/login`, loginRequest)
  }

  register(userRequest: UserRequest): Observable<UserDTO>{
    return this.http.post<UserDTO>(`${baseUrl}/users`, userRequest)
  }

  activate(activationRequest: ActivationRequest, id: number): Observable<UserDTO>{
    return this.http.post<UserDTO>(`${baseUrl}/users/activation`, activationRequest)
  }
}
