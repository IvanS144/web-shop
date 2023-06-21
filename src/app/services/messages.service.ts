import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../model/message';
import { baseUrl } from '../app.module';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private http: HttpClient) { }

  sendMessage(message: Message){
    return this.http.post(`${baseUrl}/messages`, message)
  }
}
