import {UserService} from '@services/common/user.service';
import {Component, OnInit} from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-principal',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.css']
})
export class ContentLayoutComponent implements OnInit {

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
    genero: ''
  };

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.menu();
    this.getUser();
  }

  getUser() {
    this.userService.getUser().subscribe(
      (res: any) => {
        this.almacenarUsuario(res[0]);
      }, err => {
      }
    );
  }

  almacenarUsuario(usuario: any) {
    this.usuario.nombres_user = usuario.nombres_usuario;
    this.usuario.apellidos_user = usuario.apellidos_usuario;
    this.usuario.nom_usuario = usuario.nom_usuario;
    this.usuario.imagen_usuario = usuario.imagen_usuario;
    this.usuario.presentacion = usuario.presentacion_usuario;
    this.usuario.email_user = usuario.email_usuario;
    this.usuario.fecha_nac = this.formato(usuario.fecha_nac_usuario);
    this.usuario.genero = usuario.genero;
  }

  formato(fecha_nac_usuario: string): string {
    const fecha = fecha_nac_usuario.slice(0, -14);
    const dia = fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3');
    const mes = fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$2');
    const anio = fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$1');
    return anio + '-' + mes + '-' + dia;
  }

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
    $('.modal-friends').hover(function () {
      $('.modal-friends').toggle();
    });

    $('#profilemodal').hover(function () {
      $('.modal-profile').toggle();
    });
    $('.modal-profile').hover(function () {
      $('.modal-profile').toggle();
    });


    $('#navicon').click(function () {
      $('.mobilemenu').fadeIn();
    });
    $('.all').click(function () {
      $('.mobilemenu').fadeOut();
    });
  }


}
