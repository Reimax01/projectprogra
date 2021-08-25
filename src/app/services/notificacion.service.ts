import { Notificacion } from '../models/Notificacion';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
declare var Push;

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  API_URI = environment.API_URI; // URL de Backend
  constructor(private http: HttpClient) { }
  // Obtiene Usuarios desde bd mediante servidor backend
  // tslint:disable-next-line: typedef
  getNotificaciones() {
    return this.http.get(`${this.API_URI}/notificaciones`);
  }
  // Obtiene Usuarios desde bd mediante servidor backend
  // tslint:disable-next-line: typedef
  getNotificacion(id_notif: number) {
    return this.http.get(`${this.API_URI}/notificacion/${id_notif}`);
  }
  // Almacena en bd mediante  NgModel de Usuario enviado a servidor backend
  // tslint:disable-next-line: typedef
  guardarNotificacion(notificacion: Notificacion) {
    return this.http.post(`${this.API_URI}/notificar`, notificacion);
  }
  
  // Actualiza en bd mediante  NgModel de Usuario y su id  enviado a servidor backend
  updateNotificacion(id_notif: number, updateNotificacion: Notificacion) {
    return this.http.put(`${this.API_URI}/updateNotificacion/${id_notif}`, updateNotificacion);
  }
  // Elimina Usuarios teniendo id  desde bd mediante servidor backend
  deleteNotificacion(id_notif: number) {
    return this.http.delete(`${this.API_URI}/deleteNotificacion/${id_notif}`);
  }
  notificar(mensaje: string, tipo_notificacion: string) {
    
    switch (tipo_notificacion) {
      case "Informacion":
        Push.create("Informacion", {
          body: mensaje,
          icon: '../assets/img/informacion4.png',
          timeout: 8000,
          onClick: function () {
              window.focus();
              this.close();
          }
      });
        break;
        case "Advertencia":
        Push.create("Advertencia", {
          body: mensaje,
          icon: '../assets/img/advertencia.png',
          timeout: 4000,
          onClick: function () {
              window.focus();
              this.close();
          }
      });
        break;
        case "Error":
        Push.create("Error", {
          body: mensaje,
          icon: '../assets/img/cancelar.png',
          timeout: 4000,
          onClick: function () {
              window.focus();
              this.close();
          }
      });
        break;
        case "Satisfactorio":
        Push.create("Satisfactorio", {
          body: mensaje,
          icon: '../assets/img/comprobar.png',
          timeout: 4000,
          onClick: function () {
              window.focus();
              this.close();
          }
      });
        break;
  
    
      default:
        break;
    }
    }
    // Almacena en bd mediante  NgModel de Usuario enviado a servidor backend
  // tslint:disable-next-line: typedef
  publicar(notificacion: Notificacion) {
    
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
    console.log(mes);
    if (mes < 10) {
      mesCnv = '0' + mes;
      if (dia < 10) {
        diaCnv = '0' + dia;
      }
    } else {
      mesCnv = mes + '';
    }
    console.log(mesCnv);
    return anio + '-' + mesCnv + '-' + dia + ' ' + hora + ':' + minutos + ':' + segundos;
  }
}

