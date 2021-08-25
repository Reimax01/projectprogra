import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Evento } from '../models/Evento';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  API_URI = environment.API_URI; // URL de Backend
  constructor(private http: HttpClient, private router: Router) { }
   // Obtiene Usuarios desde bd mediante servidor backend
  // tslint:disable-next-line: typedef
  getEventos() {
    return this.http.get(`${this.API_URI}/eventos`);
  }
  // Obtiene Usuarios desde bd mediante servidor backend
  // tslint:disable-next-line: typedef
  getEvento(id_evento: number) {
    return this.http.get(`${this.API_URI}/evento/${id_evento}`);
  }
  // Almacena en bd mediante  NgModel de Usuario enviado a servidor backend
  // tslint:disable-next-line: typedef
  guardarEvento(evento: Evento, file: File) {
    const form = new FormData();
    form.append('fecha_hora_evento', this.convertirFecha(evento.fecha_hora_evento));
    form.append('lugar_evento', evento.lugar_evento);
    form.append('nombre_evento', evento.nombre_evento);
    form.append('fecha_finalizacion', this.convertirFecha(evento.fecha_finalizacion));
    form.append('file', file);
    form.append('url', this.API_URI);
    return this.http.post(`${this.API_URI}/realizarEvento`, form);
  }

  // Actualiza en bd mediante  NgModel de Usuario y su id  enviado a servidor backend
  updateEvento(id_evento: number, updateEvento: Evento, file: File) {
    const form = new FormData();
    form.append('fecha_hora_evento', this.convertirFecha(updateEvento.fecha_hora_evento));
    form.append('lugar_evento', updateEvento.lugar_evento);
    form.append('nombre_evento', updateEvento.nombre_evento);
    form.append('fecha_finalizacion', this.convertirFecha(updateEvento.fecha_finalizacion));
    form.append('file', file);
    form.append('url', this.API_URI);
    return this.http.put(`${this.API_URI}/updateEvento/${id_evento}`, form);
  }
  // Elimina Usuarios teniendo id  desde bd mediante servidor backend
  deleteEvento(id_evento: number) {
    return this.http.delete(`${this.API_URI}/deleteEvento/${id_evento}`);
  }
  convertirFecha(fecha): string {
    let fechan = new Date(fecha);
    let dia = fechan.getDate();
    let mes = fechan.getMonth();
    let anio = fechan.getFullYear();
    let hora = fechan.getHours();
    let minutos = fechan.getMinutes();
    let segundos = fechan.getSeconds();
    let diaCnv = '';
    let mesCnv = '';
    if (mes < 10) {
      mesCnv = '0' + mes;
      if (dia < 10) {
        diaCnv = '0' + dia;
      } else {
        diaCnv = dia.toString();
      }
    } else {
      mesCnv = mes + '';
    }
    return anio + '-' + mesCnv + '-' + dia + ' ' + hora + ':' + minutos + ':' + segundos;
  }
}
