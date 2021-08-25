import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Invitado } from '../models/Invitado';

@Injectable({
  providedIn: 'root',
})
export class InvitadoService {
  API_URI = environment.API_URI; // URL de Backend
  constructor(private http: HttpClient, private router: Router) {}
  // Obtiene Usuarios desde bd mediante servidor backend
  // tslint:disable-next-line: typedef
  getInvitados() {
    return this.http.get(`${this.API_URI}/invitados`);
  }
  getEstadistica(id_evento){
    return this.http.get(`${this.API_URI}/estadisticaAsistencia/${id_evento}`);
  }
  // Obtiene Usuarios desde bd mediante servidor backend
  // tslint:disable-next-line: typedef
  getInvitado(id_usuario: number) {
    return this.http.get(`${this.API_URI}/invitado/${id_usuario}`);
  }
  // Almacena en bd mediante  NgModel de Usuario enviado a servidor backend
  // tslint:disable-next-line: typedef
  guardarInvitado(invitado: Invitado) {
    return this.http.post(`${this.API_URI}/registrarInvitado`, invitado);
  }

  // Actualiza en bd mediante  NgModel de Usuario y su id  enviado a servidor backend
  updateInvitado(id_invitado: number, updateInvitado: Invitado) {
    return this.http.put(
      `${this.API_URI}/updateInvitado/${id_invitado}`,
      updateInvitado
    );
  }

  // Actualiza en bd mediante  NgModel de Usuario y su id  enviado a servidor backend
  cambiarEstado(id_usuario: number, updateInvitado: Invitado) {
    return this.http.put(
      `${this.API_URI}/cambiarEstado/${id_usuario}`,
      updateInvitado
    );
  }
  // Elimina Usuarios teniendo id  desde bd mediante servidor backend
  deleteInvitado(id_invitado: number) {
    return this.http.delete(`${this.API_URI}/deleteInvitado/${id_invitado}`);
  }
}
