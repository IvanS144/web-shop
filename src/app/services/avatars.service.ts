import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../app.module';

@Injectable({
  providedIn: 'root'
})
export class AvatarsService {

  constructor(private http: HttpClient) { }

  uploadAvatar(avatar: File, id: number | string){
    let formData = new FormData();
    formData.append('file', avatar)
    return this.http.post(`${baseUrl}/files/avatars/users/${id}`, formData)
  }
}
