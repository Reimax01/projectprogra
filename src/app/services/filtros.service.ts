import { Filtro } from '../models/Filtro';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FiltrosService {
  API_URI = environment.API_URI; // URL de Backend
  constructor(private http: HttpClient, private router: Router) { }
  // tslint:disable-next-line: typedef
  getFiltros() {
    return this.http.get(`${this.API_URI}/filtros`);
  }
}
