import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs'
import { CategoryDTO } from '../model/category-dto';
import { baseUrl } from '../app.module';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<CategoryDTO[]>{
    return this.http.get<CategoryDTO[]>(`${baseUrl}/categories`)
  }
}
