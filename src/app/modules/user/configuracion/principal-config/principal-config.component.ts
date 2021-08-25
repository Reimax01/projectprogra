import {Component, OnInit} from '@angular/core';
import {UserService} from '@services/common/user.service';

declare var $: any;

@Component({
  selector: 'app-principal-config',
  templateUrl: './principal-config.component.html',
  styleUrls: ['./principal-config.component.css']
})
export class PrincipalConfigComponent implements OnInit {

  usuario = {
    id_usuario: 0,
    nom_usuario: '',
    imagen_usuario: '',
    nombres_user: '',
    apellidos_user: '',
    email_user: '',
    celular_user: '',
    fecha_nac: '',
    contrasena_usuario: '',
    presentacion: '',
    telefono: '',
    id_genero: 0,
    nombre_genero: ''
  };

  constructor(private usuarioService: UserService) {
  }

  ngOnInit(): void {
    this.menu();
    this.getUsuario();
  }

  // tslint:disable-next-line: typedef
  getUsuario() {
    this.usuarioService.getUser().subscribe(
      (res: any) => {
        this.almacenarUsuario(res[0]);
      }, err => {
      }
    );
  }

// tslint:disable-next-line: typedef
  almacenarUsuario(usuario: any) {
    this.usuario.id_usuario = usuario.id_usuario;
    this.usuario.nombres_user = usuario.nombres_usuario;
    this.usuario.apellidos_user = usuario.apellidos_usuario;
    this.usuario.nom_usuario = usuario.nom_usuario;
    this.usuario.imagen_usuario = usuario.imagen_usuario;
    this.usuario.presentacion = usuario.presentacion_usuario;
    this.usuario.email_user = usuario.email_usuario;
    this.usuario.fecha_nac = this.formato(usuario.fecha_nac_usuario);
    this.usuario.id_genero = usuario.id_genero;
    this.usuario.nombre_genero = usuario.nombre_genero;
  }

  formato(fecha_nac_usuario: string): string {
    const fecha = fecha_nac_usuario.slice(0, -14);
    const dia = fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3');
    const mes = fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$2');
    const anio = fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$1');
    return anio + '-' + mes + '-' + dia;
  }

  // tslint:disable-next-line: typedef
  menu() {
    $("#messagesmodal").hover(function () {
      $(".modal-comments").toggle();
    });
    $(".modal-comments").hover(function () {
      $(".modal-comments").toggle();
    });

    $("#friendsmodal").hover(function () {
      $(".modal-friends").toggle();
    });
    $(".modal-friends").hover(function () {
      $(".modal-friends").toggle();
    });

    $("#profilemodal").hover(function () {
      $(".modal-profile").toggle();
    });
    $(".modal-profile").hover(function () {
      $(".modal-profile").toggle();
    });


    $("#navicon").click(function () {
      $(".mobilemenu").fadeIn();
    });
    $(".all").click(function () {
      $(".mobilemenu").fadeOut();
    });
  }

}
