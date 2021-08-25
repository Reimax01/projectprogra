import { Marketplace } from '../models/Marketplace';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {
  API_URI = environment.API_URI; // URL de Backend
  constructor(private http: HttpClient, private router: Router) { }
   // Obtiene Usuarios desde bd mediante servidor backend
  // tslint:disable-next-line: typedef
  getMarketplace() {
    return this.http.get(`${this.API_URI}/marketplace`);
  }

  guardarMarketplace(marketplace: Marketplace) {
    return this.http.post(`${this.API_URI}/registrarMarketplace`, marketplace);
  }

  // Actualiza en bd mediante  NgModel de Usuario y su id  enviado a servidor backend
  updateOrganizador(id_mark: number, updateMarketplace: Marketplace) {
    return this.http.put(`${this.API_URI}/updateMarketplace/${id_mark}`, updateMarketplace);
  }
  // Elimina Usuarios teniendo id  desde bd mediante servidor backend
  deleteOrganizador(id_mark: number) {
    return this.http.delete(`${this.API_URI}/deleteMarketplace/${id_mark}`);
  }
}
