import {Component, Input, OnInit} from '@angular/core';
import {Producto} from '@models/Producto';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() producto: Producto = {
    id_producto: 0,
    nombre_producto: '',
    descripcion_producto: '',
    imagen_product: '',
    precio_product: 0,
    id_mark: 0,
  };
  constructor() { }

  ngOnInit(): void {
  }

}
