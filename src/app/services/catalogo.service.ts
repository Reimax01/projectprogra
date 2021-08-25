import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {
  API_URI = environment.API_URI; // URL de Backend
  constructor(private http: HttpClient, private router: Router) { }
  // tslint:disable-next-line: typedefs
  getcatalogo() {
    return this.http.get(`${this.API_URI}/catalogo`);
  }
}

