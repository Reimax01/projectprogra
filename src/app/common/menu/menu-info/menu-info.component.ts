import { Component, OnInit } from '@angular/core';
import { AmistadesService } from '@services/amistades.service';
import { NotificacionService } from '@services/notificacion.service';
import { UserService } from '@services/common/user.service';
import { WebSocketService } from '@services/web-socket.service';

@Component({
  selector: 'app-menu-info',
  templateUrl: './menu-info.component.html',
  styleUrls: ['./menu-info.component.css']
})
export class MenuInfoComponent implements OnInit {

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
  notificaciones: any[] = [];
  amigos: any;
  constructor(private notificacionService: NotificacionService,
              private webService: WebSocketService,
              private amigoService: AmistadesService,
              private userService: UserService) { }
  ngOnInit(): void {
    this.getUsuario();
    this.getAmigos();
    this.obtenerNotificaciones();
    // obtiene publicaciones desde el servidor mediante socket
    this.webService.listen('obtener-notificacion').subscribe((data: any) => {
      this.notificaciones.push(data[0]);
      // ordena notificaciones desendentemente
      const notificacionesOrdenadas = this.notificaciones.sort((a, b) => {
        return a.id_notif - b.id_notif;
      });

      // sobre escribe comentario con comentarios ordenados
      this.notificaciones = notificacionesOrdenadas;
    });
  }

  getUsuario() {
    this.userService.getUser().subscribe(
      (res: any) => {
        this.almacenarUsuario(res[0]);
      }, err => { }
    );
  }

  // almacena usuario desde variable usuario obtenido desde bd
  almacenarUsuario(usuario: any) {
    this.usuario.id_usuario = usuario.id_usuario;
    this.usuario.nombres_user = usuario.nombres_usuario;
    this.usuario.apellidos_user = usuario.apellidos_usuario;
    this.usuario.nom_usuario = usuario.nom_usuario;
    this.usuario.imagen_usuario = usuario.imagen_usuario;
    this.usuario.presentacion = usuario.presentacion_usuario;
    this.usuario.email_user = usuario.email_usuario;
    this.usuario.genero = usuario.genero;
  }
  getAmigos() {
    let id_usuario = parseInt(localStorage.getItem('id_user'));
    this.amigoService.getAmigos(id_usuario).subscribe(
      (res: any) => {
        this.amigos = res;
      }
    );
  }

  esAmigo(id_usuario: number): boolean {
    const existe = this.amigos.filter(amigo => amigo.id_amigo == id_usuario);
    if (existe.length > 0 || id_usuario == this.usuario.id_usuario) {
      return true;
    } else {
      return false;
    }
  }

  obtenerNotificaciones() {
    this.notificacionService.getNotificaciones().subscribe(
      (res: any) => {
        this.filtrarNotificaciones(res);
      }
    );
  }

  filtrarNotificaciones(notificacion){
    for (let index = 0; index < notificacion.length; index++) {
      if (this.esAmigo(notificacion[index].id_usuario)) {
        this.notificaciones.push(notificacion[index]);
      }
    }
  }

  formato(texto) {
    if (texto) {
      const fecha = texto.slice(0, -14);
      // tslint:disable-next-line: max-line-length
      const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      let horas = 0;
      // tslint:disable-next-line: quotemark
      const separador = 'T';
      const tiempop = texto.split(separador);
      const tiempot = tiempop[1].split('.')[0];
      if (Number(tiempot.split(':')[0]) < 5) {
        horas = Number(tiempot.split(':')[0]) + 19;
      } else {
        horas = Number(tiempot.split(':')[0]) - 5;
      }

      const minutos = tiempot.split(':')[1];
      const segundos = tiempot.split(':')[2];
      const tiempo = horas + ':' + minutos + ':' + segundos;
      const dia = fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3');
      const mes = fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$2');
      const anio = fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$1');
      // tslint:disable-next-line: radix
      const mesCnv = meses[parseInt(mes)];
      return dia + ' de ' + mesCnv + ' del ' + anio + ' a las ' + tiempo;
    }
  }
}

