import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CityDTO } from '../model/city-dto';
import { baseUrl } from '../app.module';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<CityDTO[]>(`${baseUrl}/cities`)
  }
}
