import { Amigo } from '../models/Amigo';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AmistadesService {
  API_URI = environment.API_URI; // URL de Backend
  constructor(private http: HttpClient, private router: Router) { }

  getAmigos(id_usuario: number) {
    return this.http.get(`${this.API_URI}/amigo/${id_usuario}`);
  }
  getsoliicitudesAmistad(id_usuario: number){
    return this.http.get(`${this.API_URI}/solocitudesAmistad/${id_usuario}`);
  }
  cantidadSeguidores(id_usuario: number) {
    return this.http.get(`${this.API_URI}/solocitudesAmistad/${id_usuario}`);
  }
  // Elimina Usuarios teniendo id  desde bd mediante servidor backend
  deleteAmigo(id_usuario: number, id_amigo: number) {

    return this.http.delete(`${this.API_URI}/deleteAmigo/${id_usuario}/${id_amigo}`);
  }
  // Almacena en bd mediante  NgModel de Usuario enviado a servidor backend
  saveAmigo(amigo: Amigo) {
    return this.http.post(`${this.API_URI}/registrarAmigo`, amigo);
  }
  // Actualiza en bd mediante  NgModel de Usuario y su id  enviado a servidor backend
  updateAmigo(id_usuario: number, updateamigo: Amigo) {
    return this.http.put(`${this.API_URI}/updateAmigo/${id_usuario}`, updateamigo);
  }
  aceptarAmigo(id_usuario: number, id_amigo: number) {
    return this.http.get(`${this.API_URI}/aceptarAmigo/${id_usuario}/${id_amigo}`);
  }
  bloquearAmigo(id_usuario: number, id_amigo: number) {
    return this.http.get(`${this.API_URI}/bloquearAmigo/${id_usuario}/${id_amigo}`);
  }
  desbloquearAmigo(id_usuario: number, id_amigo: any) {
    return this.http.get(`${this.API_URI}/desbloquearAmigo/${id_usuario}/${id_amigo}`);
  }
  seguirAmigo(id_usuario: number, id_amigo: number) {
    return this.http.get(`${this.API_URI}/seguirAmigo/${id_usuario}/${id_amigo}`);
  }
  dejarseguirAmigo(id_usuario: number, id_amigo: number) {
    return this.http.get(`${this.API_URI}/dejarseguirAmigo/${id_usuario}/${id_amigo}`);
  }

}
