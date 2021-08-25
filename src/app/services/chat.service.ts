import { Chat } from '../models/Chat';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  API_URI = environment.API_URI; // URL de Backend
  constructor(private http: HttpClient, private router: Router) { }
  // tslint:disable-next-line: typedefs
  getchat() {
    return this.http.get(`${this.API_URI}/chat`);
  }
  // tslint:disable-next-line: typedef
  updateChat(chat: Chat,id_chat:number) {
    return this.http.put(`${this.API_URI}/updateChat/${id_chat}`, chat);

  }
    chatear(chat: Chat) {
      return this.http.post(`${this.API_URI}/chatear`, chat);

    }
}
