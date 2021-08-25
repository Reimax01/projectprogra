import { Injectable } from '@angular/core';
import { Multimedia } from '../models/Multimedia';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MultimediaPubService {
  API_URI = environment.API_URI; // URL de Backend
  constructor(private http: HttpClient, private router: Router) { }
    // tslint:disable-next-line: typedef
    getImagen(id_pub: number) {
      return this.http.get(`${this.API_URI}/imagen/${id_pub}`);
    }
  // tslint:disable-next-line: typedef
  publicar_imagen(multimedia: Multimedia, file: File) {
    const form = new FormData();
    form.append('id_pub', multimedia.id_pub.toString());
    form.append('file', file);
    form.append('url', this.API_URI);
    form.append('id_type', multimedia.id_type.toString());
    form.append('id_filtro', multimedia.id_filtro.toString());
    return this.http.post(`${this.API_URI}/guardarImagen`, form);
  }
}
