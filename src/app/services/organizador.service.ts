import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Organizador } from '../models/Organizador';

@Injectable({
  providedIn: 'root'
})
export class OrganizadorService {

  API_URI = environment.API_URI; // URL de Backend
  constructor(private http: HttpClient, private router: Router) { }
   // Obtiene Usuarios desde bd mediante servidor backend
  // tslint:disable-next-line: typedef
  getOrganizadores() {
    return this.http.get(`${this.API_URI}/organizadores`);
  }
  // Obtiene Usuarios desde bd mediante servidor backend
  // tslint:disable-next-line: typedef
  getOrganizador(id_evento: number) {
    return this.http.get(`${this.API_URI}/organizador/${id_evento}`);
  }
  getOrganizadorUsuario(id_usuario: number){
    return this.http.get(`${this.API_URI}/organizadorUsuario/${id_usuario}`);
  }
  // Almacena en bd mediante  NgModel de Usuario enviado a servidor backend
  // tslint:disable-next-line: typedef
  guardarOrganizador(organizador: Organizador) {
    return this.http.post(`${this.API_URI}/registrarOrganizador`, organizador);
  }

  // Actualiza en bd mediante  NgModel de Usuario y su id  enviado a servidor backend
  updateOrganizador(id_evento: number, updateOrganizador: Organizador) {
    return this.http.put(`${this.API_URI}/updateOrganizador/${id_evento}`, updateOrganizador);
  }
  // Elimina Usuarios teniendo id  desde bd mediante servidor backend
  deleteOrganizador(id_evento: number) {
    return this.http.delete(`${this.API_URI}/deleteOrganizador/${id_evento}`);
  }
}
