import { Reaccionpub} from '../models/Reaccionpub';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ReaccionpubService {
  API_URI = environment.API_URI; // URL de Backend
  constructor(private http: HttpClient) { }
  // Obtiene Usuarios desde bd mediante servidor backend
  // tslint:disable-next-line: typedef
  getReaccionespub() {
    return this.http.get(`${this.API_URI}/reacciones`);
  }
    // Obtiene Usuarios desde bd mediante servidor backend
  // tslint:disable-next-line: typedef
  getReaccionpub(id_pub: number) {
    return this.http.get(`${this.API_URI}/reaccion/${id_pub}`);
  }
  // Almacena en bd mediante  NgModel de Usuario enviado a servidor backend
  // tslint:disable-next-line: typedef
  publicar(reaccionpub: Reaccionpub) {
    return this.http.post(`${this.API_URI}/reaccionar`, reaccionpub);
  }
  actualizar(reaccionpub: Reaccionpub) {
    return this.http.post(`${this.API_URI}/otravez`, reaccionpub);
  }
  borrar(reaccionpub: Reaccionpub) {
    return this.http.post(`${this.API_URI}/noreac`, reaccionpub);
  }
} 
