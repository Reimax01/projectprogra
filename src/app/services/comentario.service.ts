import { Comentario } from '../models/Comentario';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  API_URI = environment.API_URI; // URL de Backend
  constructor(private http: HttpClient, private router: Router) { }
  // tslint:disable-next-line: typedefs
  getComentarios(id_pub: number) {
    return this.http.get(`${this.API_URI}/comentarios/${id_pub}`);
  }
  // tslint:disable-next-line: typedef
  comentar(comentario: Comentario) {
    return this.http.post(`${this.API_URI}/comentar`, comentario);

  }
}
