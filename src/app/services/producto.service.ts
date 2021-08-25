import { Producto } from '../models/Producto';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  API_URI = environment.API_URI; // URL de Backend
  constructor(private http: HttpClient, private router: Router) { }
   // Obtiene Usuarios desde bd mediante servidor backend
  // tslint:disable-next-line: typedef
  getProductos() {
    return this.http.get(`${this.API_URI}/productos`);
  }
  // Obtiene Usuarios desde bd mediante servidor backend
  // tslint:disable-next-line: typedef
  getProducto(id_producto: number) {
    return this.http.get(`${this.API_URI}/producto/${id_producto}`);
  }
  // Almacena en bd mediante  NgModel de Usuario enviado a servidor backend
  // tslint:disable-next-line: typedef
  guardarProducto(producto: Producto, file: File) {
    const form = new FormData();
    form.append('nombre_producto', producto.nombre_producto);
    form.append('descripcion_producto', producto.descripcion_producto);
    form.append('precio_product', producto.precio_product.toString());
    form.append('file', file);
    form.append('url', this.API_URI);
    form.append('id_mark', producto.id_mark.toString());
    return this.http.post(`${this.API_URI}/registrarProducto`, form);
  }

  // Actualiza en bd mediante  NgModel de Usuario y su id  enviado a servidor backend
  updateEvento(id_producto: number, updateProducto: Producto, file: File) {
    const form = new FormData();
    form.append('nombre_producto', updateProducto.nombre_producto);
    form.append('descripcion_producto', updateProducto.descripcion_producto);
    form.append('precio_product', updateProducto.precio_product.toString());
    form.append('file', file);
    form.append('url', this.API_URI);
    form.append('id_mark', updateProducto.id_mark.toString());
    return this.http.put(`${this.API_URI}/updateProducto/${id_producto}`, form);
  }
  // Elimina Usuarios teniendo id  desde bd mediante servidor backend
  deleteEvento(id_producto: number) {
    return this.http.delete(`${this.API_URI}/deleteProducto/${id_producto}`);
  }
}
