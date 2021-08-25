import { Component, OnInit } from '@angular/core';
declare let $: any;

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  cambiarTema(event){
    let evento = event.target.checked;
    let originalCSS = { 'background-color': '#edf2f6' };
    let nuevoCSS = { 'background': '#1f1f1f', 'color' : '#f1eded' };
    if (evento) {
      $('body').css(nuevoCSS);
    }
    else{
      $('body').css(originalCSS );
    }
  }

}
