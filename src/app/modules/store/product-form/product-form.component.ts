import { UserService } from '@services/common/user.service';
import { MarketplaceService } from '@services/marketplace.service';
import { Component, OnInit } from '@angular/core';
import { CatalogoService } from '@services/catalogo.service';
import { ProductoService } from '@services/producto.service';
import { Producto } from '@models/Producto';
import { Marketplace } from '@models/Marketplace';
import { DetalleProd } from '@models/DetalleProd';
import { DetalleProdService } from '@services/detalleprod.service';
import { WebSocketService } from '@services/web-socket.service';
import {NsMessageService} from "@services/common/ns.message.service";

@Component({
  selector: 'app-producto',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  existetienda = false;
  existecategoria = false;
  file: any;
  image = '';

  producto: Producto = {
    id_producto: 0,
    nombre_producto: '',
    descripcion_producto: '',
    imagen_product: '',
    precio_product: 0,
    id_mark: 0,
  };
  detalleprod: DetalleProd = {
    id_catalogo: 0,
    id_producto: 0,
  };

  marketPlace: Marketplace = {
    id_mark: 0,
    contenido_mark: '',
    lugar_mark: '',
    id_usuario: 0,
  };
  catalogos: any;
  tiendas: any;
  constructor(
    private productoService: ProductoService,
    private catalogoService: CatalogoService,
    private marketPlaceService: MarketplaceService,
    private usuarioService: UserService,
    private webService: WebSocketService,
    private detalleProdService: DetalleProdService,
    private nsMessageService: NsMessageService
  ) {}

  ngOnInit(): void {
    this.getMarketplace();
    this.getCatalogo();
    this.getUsuario();

    // obtiene publicaciones desde el servidor mediante socket
    this.webService.listen('obtener-tienda').subscribe((data: any) => {
      console.log(data);
      this.tiendas = data;
    });
  }
  control_botontn(): void {
    this.existetienda = true;
  }
  control_botoncat(): void {
    this.existecategoria = true;
  }
  public onFileChange(event): void {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      // tslint:disable-next-line: typedef
      reader.onload = function load() {
        this.image = reader.result;
      }.bind(this);
      this.file = file;
    }
  }

  guardarProducto(): void {
    this.productoService
      .guardarProducto(this.producto, this.file)
      .subscribe((res: any) => {
        if (res) {
          console.log(res);
          this.nsMessageService.success('Producto registrado con éxito.');
          this.guardarDetalle(res[0].id_producto);
          this.webService.emit('producto', res);
          this.limpiar();
        }
      });
  }

  guardarTienda(): void {
    // tslint:disable-next-line: radix
    this.marketPlace.id_usuario = parseInt(localStorage.getItem('id_user'));
    this.marketPlaceService
      .guardarMarketplace(this.marketPlace)
      .subscribe((res: any) => {
        localStorage.setItem('id_mark', res[0].id_mark);
        this.webService.emit('tienda', res);
        this.limpiarMarketplace();
      });
  }
  // tslint:disable-next-line: variable-name
  guardarDetalle(id_producto: number): void {
    this.detalleprod.id_producto = id_producto;
    this.detalleProdService
      .guardarDetalleProd(this.detalleprod)
      .subscribe((res: any) => {
        this.webService.emit('detalle', res);
        this.limpiarDetalle();
      });
  }
  // tslint:disable-next-line: variable-name
  obtenerCategoria(id_catalogo: number): void {
    this.detalleprod.id_catalogo = id_catalogo;
  }
  // tslint:disable-next-line: variable-name
  obtenerTienda(id_mark: number): void {
    console.log(id_mark);
    localStorage.setItem('id_mark',id_mark.toString());
  }
  limpiar(): void {
    this.producto.id_producto = 0;
    this.producto.nombre_producto = '';
    this.producto.descripcion_producto = '';
    this.producto.imagen_product = '';
    this.producto.precio_product = 0;
  }

  limpiarDetalle(): void {
    this.detalleprod.id_producto = 0;
    this.detalleprod.id_catalogo = 0;
  }

  limpiarMarketplace(): void {
    this.marketPlace.id_mark = 0;
    this.marketPlace.contenido_mark = '';
    this.marketPlace.lugar_mark = '';
    this.marketPlace.id_usuario = 0;
  }

  getCatalogo(): void {
    this.catalogoService.getcatalogo().subscribe((res: any) => {
      this.catalogos = res;
    });
  }

  getMarketplace(): void {
    this.marketPlaceService.getMarketplace().subscribe((res: any) => {
      this.tiendas = res;
    });
  }

  getUsuario(): void {
    this.usuarioService.getUser().subscribe(
      (res: any) => {
        localStorage.setItem('id_user', res[0].id_usuario);
      },
      (err) => {}
    );
  }
  guardar(): void {
    if (this.existetienda) {
      this.guardarTienda();
      // tslint:disable-next-line: radix
      this.producto.id_mark = parseInt(localStorage.getItem('id_mark'));
      this.guardarProducto();

    } else {
      this.producto.id_mark = parseInt(localStorage.getItem('id_mark'));
      this.guardarProducto();

    }
  }
}
