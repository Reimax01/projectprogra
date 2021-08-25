import { Publicacion } from '../models/Publicacion';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {
  API_URI = environment.API_URI; // URL de Backend
  constructor(private http: HttpClient) { }
  // Obtiene Usuarios desde bd mediante servidor backend
  // tslint:disable-next-line: typedef
  getPublicaciones() {
    return this.http.get(`${this.API_URI}/publicaciones`);
  }
    // Obtiene Usuarios desde bd mediante servidor backend
  // tslint:disable-next-line: typedef
  getPublicacion(id_pub: number) {
    return this.http.get(`${this.API_URI}/publicacion/${id_pub}`);
  }
  // Almacena en bd mediante  NgModel de Usuario enviado a servidor backend
  // tslint:disable-next-line: typedef
  publicar(publicacion: Publicacion) {
    return this.http.post(`${this.API_URI}/publicar`, publicacion);
  }
  // tslint:disable-next-line: typedef
  // tslint:disable-next-line: variable-name
  eliminarPublicacion(id_pub: number){
    return this.http.delete(`${this.API_URI}/eliminarPublicacion/${id_pub}`);
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
      } else {
        diaCnv = dia.toString();
      }
    } else {
      mesCnv = mes.toString();
    }
    console.log(mesCnv);
    return anio + '-' + mesCnv + '-' + dia + ' ' + hora + ':' + minutos + ':' + segundos;
  }
}
