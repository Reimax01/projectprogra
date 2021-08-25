import { Component, OnInit } from '@angular/core';
import { ProductoService } from '@services/producto.service';
import { WebSocketService } from '@services/web-socket.service';

@Component({
  selector: 'app-principal-tienda',
  templateUrl: './principal-store.component.html',
  styleUrls: ['./principal-store.component.css'],
})
export class PrincipalStoreComponent implements OnInit {
  productos = [];

  constructor(
    private webService: WebSocketService,
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {
    this.getproductos();

    // obtiene publicaciones desde el servidor mediante socket
    this.webService.listen('obtener-product-form').subscribe((data: any) => {
      this.productos = data;
    });
  }
  getproductos() {
    this.productoService.getProductos().subscribe((res: any) => {
      this.productos = res;
    });
  }
}
