import { Chat } from '../models/Chat';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Mensaje } from '../models/Mensaje';

@Injectable({
  providedIn: 'root',
})
export class MensajeService {
  API_URI = environment.API_URI; // URL de Backend
  constructor(private http: HttpClient, private router: Router) {}
  // tslint:disable-next-line: typedefs
  getmensajes() {
    return this.http.get(`${this.API_URI}/mensajes`);
  }
  getmensaje(id_mensaje) {
    return this.http.get(`${this.API_URI}/mensaje/${id_mensaje}`);
  }
  getmensaje_chat(id_chat) {
    return this.http.get(`${this.API_URI}/mensaje_chat/${id_chat}`);
  }

  deleteMensaje(id_mensaje) {
    return this.http.delete(`${this.API_URI}/deleteMensaje/${id_mensaje}`);
  }
  // tslint:disable-next-line: typedef

  mensajear(mensaje: Mensaje, file: File) {
    const form = new FormData();
    form.append('mensaje', mensaje.mensaje.toString());
    form.append('estado', mensaje.estado.toString());
    form.append(
      'fecha_hora_mensaje',
      this.convertirFecha(mensaje.fecha_hora_mensaje)
    );
    form.append('id_chat', mensaje.id_chat.toString());
    form.append('id_usuario', mensaje.id_usuario.toString());
    form.append('file', file);
    form.append('url', this.API_URI);
    return this.http.post(`${this.API_URI}/mensajear`, form);
  }

  updateMensaje(mensaje: Mensaje, file: File,id_mensaje:number) {
    const form = new FormData();
    form.append('mensaje', mensaje.mensaje.toString());
    form.append('estado', mensaje.estado.toString());
    form.append(
      'fecha_hora_mensaje',
      this.convertirFecha(mensaje.fecha_hora_mensaje)
    );
    form.append('id_chat', mensaje.id_chat.toString());
    form.append('id_usuario', mensaje.id_usuario.toString());
    form.append('file', file);
    form.append('url', this.API_URI);
    return this.http.put(`${this.API_URI}/updateMensaje/${id_mensaje}`, form);
  }

  convertirFecha(fecha: Date): string {
    let dia = fecha.getDate();
    let mes = fecha.getMonth();
    let anio = fecha.getFullYear();
    let hora = fecha.getHours();
    let minutos = fecha.getMinutes();
    let segundos = fecha.getSeconds();
    let diaCnv = '';
    let mesCnv = '';
    if (mes < 10) {
      mesCnv = '0' + mes;
      if (dia < 10) {
        diaCnv = '0' + dia;
      }
    } else {
      mesCnv = mes + '';
    }
    return (
      anio +
      '-' +
      mesCnv +
      '-' +
      dia +
      ' ' +
      hora +
      ':' +
      minutos +
      ':' +
      segundos
    );
  }
}
