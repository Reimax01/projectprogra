import { Historias } from '../models/Historias';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class HistoriasService {
  API_URI = environment.API_URI; // URL de Backend
  constructor(private http: HttpClient) { }
  // Obtiene Usuarios desde bd mediante servidor backend
  // tslint:disable-next-line: typedef
  getHistorias() {
    return this.http.get(`${this.API_URI}/historias`);
  }
    // Obtiene Usuarios desde bd mediante servidor backend
  // tslint:disable-next-line: typedef
  getHistoriaUsuario(id_usuario: number) {
    return this.http.get(`${this.API_URI}/historia/${id_usuario}`);
  }
  // Almacena en bd mediante  NgModel de Usuario enviado a servidor backend
  // tslint:disable-next-line: typedef
  publicar_historia(historia: Historias, file: File) {
    const form = new FormData();
    form.append('id_usuario', historia.id_usuario.toString());
    form.append('file', file);
    form.append('url', this.API_URI);
    return this.http.post(`${this.API_URI}/publicar_historia`, form);
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
    return anio + '-' + mesCnv + '-' + dia + ' ' + hora + ':' + minutos + ':' + segundos;
  }
}
