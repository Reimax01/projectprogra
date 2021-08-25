import { PublicacionService } from './../../../services/publicacion.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comentario } from 'src/app/models/Comentario';
import { ComentarioService } from 'src/app/services/comentario.service';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { UserService } from 'src/app/services/common/user.service';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css']
})
export class PublicacionComponent implements OnInit {

  publicacion: any = {
    id_pub: 0,
    contenido_pub: '',
    id_type: 0
  };
  id_pub: number;
  comentarios: any = [];
  // tslint:disable-next-line: variable-name
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
  comentario: Comentario = {
    id_com: 0,
    contenido_com: '',
    fecha_hora_com: new Date(),
    id_usuario: 0,
    id_pub: 0,
  };
  // tslint:disable-next-line: variable-name
  accion_comentario: string;
  // tslint:disable-next-line: variable-name
  event_name = 'comentar';
  constructor(private route: ActivatedRoute,
              private webService: WebSocketService,
              private publicacionService: PublicacionService,
              private usuarioService: UserService,
              private comentarioService: ComentarioService) { }

  ngOnInit(): void {
    // tslint:disable-next-line: radix
    this.id_pub = Number.parseInt(this.route.snapshot.paramMap.get('id_pub'));
    this.getUsuario();
    this.getPublicacion();
    this.webService.listen('obtener-comentario').subscribe((data: any) => {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < data.length; i++) {
        this.comentarios.push(data[i][0]);
      }
      const hash = {};
      this.comentarios = this.comentarios.filter(comentario => hash[comentario.id_com] ? false : hash[comentario.id_com] = true);
      const comentariosOrdenadas = this.comentarios.sort((a, b) => {
        return b.id_com - a.id_com;
      });
      this.comentarios = comentariosOrdenadas;
    });
    this.webService.listen('notificar-comentario').subscribe((data: any) => {
      this.accion_comentario = data + ' esta escribiendo...';
    });

  }
  // Obtiene usuario de sesion actual
  // tslint:disable-next-line: typedef
  getUsuario() {
    this.usuarioService.getUser().subscribe(
      (res: any) => {
        this.almacenarUsuario(res[0]);
      }, err => { }
    );
  }
  // Almacena datos de usuarios en objeto usuario desde la bd
  // tslint:disable-next-line: typedef
  almacenarUsuario(usuario: any) {
    this.usuario.id_usuario = usuario.id_usuario;
    this.usuario.nombres_user = usuario.nombres_usuario;
    this.usuario.apellidos_user = usuario.apellidos_usuario;
    this.usuario.nom_usuario = usuario.nom_usuario;
    this.usuario.imagen_usuario = usuario.imagen_usuario;
    this.usuario.presentacion = usuario.presentacion_usuario;
    this.usuario.email_user = usuario.email_usuario;
    this.usuario.fecha_nac = this.formatoFechUsu(usuario.fecha_nac_usuario);
    this.usuario.genero = usuario.genero;
  }
  // Convierte fecha recivida en formato entendible por html5
  formatoFechUsu(fecha_nac_usuario: string): string {
    const fecha = fecha_nac_usuario.slice(0, -14);
    const dia = fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3');
    const mes = fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$2');
    const anio = fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$1');
    return anio + '-' + mes + '-' + dia;
  }
  // Obtiene publicacion de id de parametro cecivida desde otro componente almacenado en id_pub
  // tslint:disable-next-line: typedef
  getPublicacion() {
    this.publicacionService.getPublicacion(this.id_pub).subscribe(
      (res: any) => {
        this.publicacion = res[0];
        this.getComentarios(res);
      }
    );
  }
  // obtiene comentario de las publicaciones obtenidas desde variable comentario
  // tslint:disable-next-line: typedef
  getComentarios(comentario: any) {
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < comentario.length; index++) {
      this.getComentario(comentario[index].id_pub);
    }
  }
  // Obtiene comentario  de publicacion determinada por variable id_pub
  // tslint:disable-next-line: typedef
  // tslint:disable-next-line: variable-name
  getComentario(id_pub: number) {
    this.comentarioService.getComentarios(id_pub).subscribe(
      (res: any) => {
        // tslint:disable-next-line: prefer-for-of
        for (let index = 0; index < res.length; index++) {
          this.comentarios.push(res[index]);
        }
      }, err => {

      }
    );
  }
  // Notifica a otros usarios mediante socket quien escribio comentario
  // tslint:disable-next-line: typedef
  public notificarComentario() {
    this.webService.emit('escribir-comentario', this.usuario.nom_usuario);
  }
  // Convierte cadena a fecha en formato texto
  // tslint:disable-next-line: typedef
  public formato(texto) {
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
  // Realiza comentario de publicacion determinada por variable id_pub
  // tslint:disable-next-line: variable-name
  // tslint:disable-next-line: typedef
  public comentar(id_pub) {
    this.comentario.id_pub = id_pub;
    this.comentario.id_usuario = this.usuario.id_usuario;
    this.comentarioService.comentar(this.comentario).subscribe(
      (res: any) => {
        this.webService.emit(this.event_name, res);
        this.comentario.contenido_com = '';
      }
    );
  }
  // realiza conteo de comentarios de publicacion determinada por variable id_pub
  // tslint:disable-next-line: typedef
  public contarComentario(id_pub: number) {
    // tslint:disable-next-line: variable-name
    const cant_com = this.comentarios.filter(comentario => comentario.id_pub == id_pub).length;
    if (cant_com <= 1) {
      return ' ' + cant_com + ' comentario';
    } else {
      return ' ' + cant_com + ' comentarios';
    }
  }
}
