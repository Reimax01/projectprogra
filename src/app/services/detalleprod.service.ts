import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { DetalleProd } from '../models/DetalleProd';

@Injectable({
  providedIn: 'root'
})
export class DetalleProdService {
  API_URI = environment.API_URI; // URL de Backend
  constructor(private http: HttpClient, private router: Router) { }
   // Obtiene Usuarios desde bd mediante servidor backend
  // tslint:disable-next-line: typedef
  getDetalleProd() {
    return this.http.get(`${this.API_URI}/detalle`);
  }

  // Almacena en bd mediante  NgModel de Usuario enviado a servidor backend
  // tslint:disable-next-line: typedef
  guardarDetalleProd(detalleprod: DetalleProd) {
    return this.http.post(`${this.API_URI}/registrarDetalle`, detalleprod);
  }
}
