import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Usuario_chat } from '../models/Usuario_chat';

@Injectable({
  providedIn: 'root'
})
export class UsuarioChatService {
  API_URI = environment.API_URI; // URL de Backend
  constructor(private http: HttpClient, private router: Router) { }
  // tslint:disable-next-line: typedefs
  getusuarios_chat() {
    return this.http.get(`${this.API_URI}/usuarios_chat`);
  }

  // tslint:disable-next-line: typedef
  updateUsuario_chat(usuario_chat: Usuario_chat,id_chat:number) {
    return this.http.put(`${this.API_URI}/updateUsuario_chat/${id_chat}`, usuario_chat);

  }
  usuario_chatear(usuario_chat: Usuario_chat) {
      return this.http.post(`${this.API_URI}/usuario_chatear`, usuario_chat);
    }

}

