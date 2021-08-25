import { FiltrosService } from '@services/filtros.service';
import { MultimediaPubService } from '@services/multimedia-pub.service';
import { Multimedia } from '@models/Multimedia';
import { PublicacionService } from '@services/publicacion.service';
import { Publicacion } from '@models/Publicacion';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@services/common/user.service';
import { WebSocketService } from '@services/web-socket.service';
import { Notificacion } from '@models/Notificacion';
import { NotificacionService } from '@services/notificacion.service';
declare var Caman;

@Component({
  selector: 'app-menu-movil',
  templateUrl: './menu-movil.component.html',
  styleUrls: ['./menu-movil.component.css']
})
export class MenuMovilComponent implements OnInit {
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
  file: any;
  image = '';
  publicacion: Publicacion = {
    id_pub: 0,
    fecha_bub: new Date(),
    id_usuario: 0
  };
  multimedia: Multimedia = {
    id_pub: 0,
    contenido_mult: '',
    id_type: 0,
    id_filtro: 0,
    id_mult: 0
  };
  // tslint:disable-next-line: variable-name
  event_name = 'publicar';
  event_name_notificar = 'notificar';
  esMovil = false;
  tipoArchivo: string;
  tabAct: any;
  filtros = [{ id_filtro: 0, nombre_filtro: 'Clásico', imagen_filtro: '' },
  { id_filtro: 2, nombre_filtro: 'Nostalgia', imagen_filtro: '' },
  { id_filtro: 3, nombre_filtro: 'Claridad', imagen_filtro: '' },
  { id_filtro: 4, nombre_filtro: 'Majestuso', imagen_filtro: '' },
  { id_filtro: 5, nombre_filtro: 'Amor', imagen_filtro: '' },
  { id_filtro: 6, nombre_filtro: 'Otoño', imagen_filtro: '' },
  { id_filtro: 7, nombre_filtro: 'Consentrado', imagen_filtro: '' },
  { id_filtro: 8, nombre_filtro: 'Nublado', imagen_filtro: '' },
  { id_filtro: 9, nombre_filtro: 'Amanecer', imagen_filtro: '' },
  { id_filtro: 10, nombre_filtro: 'Soleado', imagen_filtro: '' },
  { id_filtro: 11, nombre_filtro: 'Sucio', imagen_filtro: '' },
  { id_filtro: 12, nombre_filtro: 'primavera', imagen_filtro: '' },
  { id_filtro: 13, nombre_filtro: 'back red', imagen_filtro: '' },
  { id_filtro: 14, nombre_filtro: 'intensive ocean', imagen_filtro: '' },
  { id_filtro: 15, nombre_filtro: 'oversun', imagen_filtro: '' },
  { id_filtro: 16, nombre_filtro: 'mulpi fashion', imagen_filtro: '' },
  { id_filtro: 17, nombre_filtro: 'fusion', imagen_filtro: '' },
  { id_filtro: 18, nombre_filtro: 'nature screen', imagen_filtro: '' },
  { id_filtro: 19, nombre_filtro: 'dark nature', imagen_filtro: '' },
  { id_filtro: 20, nombre_filtro: 'red status', imagen_filtro: '' },
  { id_filtro: 21, nombre_filtro: 'cool purple', imagen_filtro: '' },
  { id_filtro: 22, nombre_filtro: 'Gold Human', imagen_filtro: '' },
  { id_filtro: 23, nombre_filtro: 'warm platinum', imagen_filtro: '' },
  { id_filtro: 24, nombre_filtro: 'Lighten Blue', imagen_filtro: '' },
  { id_filtro: 25, nombre_filtro: 'Dark Green', imagen_filtro: '' },
  { id_filtro: 26, nombre_filtro: 'Celestial ocean', imagen_filtro: '' },
  { id_filtro: 27, nombre_filtro: 'Red Darken', imagen_filtro: '' },
  { id_filtro: 28, nombre_filtro: 'Best Orange', imagen_filtro: '' },
  { id_filtro: 29, nombre_filtro: 'Golden Summer', imagen_filtro: '' },
  { id_filtro: 30, nombre_filtro: 'Human Ocean', imagen_filtro: '' },
  { id_filtro: 31, nombre_filtro: 'Purple spring', imagen_filtro: '' },
  { id_filtro: 32, nombre_filtro: 'Pink Autumn', imagen_filtro: '' },
  { id_filtro: 33, nombre_filtro: 'Elegant Turquoise', imagen_filtro: '' },
  { id_filtro: 34, nombre_filtro: 'Fuxia Xtreme', imagen_filtro: '' },
  { id_filtro: 35, nombre_filtro: 'Blue Sport', imagen_filtro: '' },
  { id_filtro: 36, nombre_filtro: 'Real Blue', imagen_filtro: '' }
  ];
  brillo: number;
  contraste: number;
  saturacion: number;
  archivos: any = new Array();
  // tslint:disable-next-line: variable-name
  list_archivos: any = [];
  contador = 0;
  constructor(private usuarioService: UserService,
              private publicacionService: PublicacionService,
              private filtroService: FiltrosService,
              private multimediaService: MultimediaPubService,
              private notificacioneService: NotificacionService,
              private webService: WebSocketService,
              private router: Router) { }
  ngOnInit(): void {
    this.getUsuario();
    this.detectarMovil();
    this.getFiltros();
  }
  getFiltros() {
    this.filtroService.getFiltros().subscribe(
      (res: any) => {
        // tslint:disable-next-line: prefer-for-of
        for (let index = 0; index < res.length; index++) {
          this.filtros.push({id_filtro: res[index].id_filtro,
                             nombre_filtro: res[index].nombre_filtro,
                             imagen_filtro: res[index].imagen_filtro});
        }
      }
    );
  }
  // Obtiene usuario de sesion
  // tslint:disable-next-line: typedef
  getUsuario() {
    this.usuarioService.getUser().subscribe(
      (res: any) => {
        this.almacenarUsuario(res[0]);
      }, err => { }
    );
  }
  guardarnotificacion(notificacion: Notificacion) {
    this.notificacioneService.guardarNotificacion(notificacion).subscribe(
      (res: any) => {
        notificacion.id_notif=res.id_notif,
        notificacion.contenido_notif=res.contenido_notif,
        notificacion.fecha_hora_notif=res.fecha_hora_notif,
        notificacion.id_usuario=res.id_usuario;
        this.webService.emit(this.event_name_notificar,res);
      }
    );

  }
  // Almacena en objeto usuario campos recividos desde la bd
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
    this.usuario.genero = usuario.genero;
  }
  // Convierte fecha  recivida a formato entendible por html5
  // tslint:disable-next-line: variable-name
  formato(fecha_nac_usuario: string): string {
    const fecha = fecha_nac_usuario.slice(0, -14);
    const dia = fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3');
    const mes = fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$2');
    const anio = fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$1');
    return anio + '-' + mes + '-' + dia;
  }
  // Elimina o cierra sesion ademas de eliminar token de sesion
  public cerrarSesion(): void {
    this.usuarioService.logout().subscribe(
      (res: any) => {
        localStorage.removeItem('token');
        this.router.navigate(['/']);
      }, err => { }
    );
  }
  // Almacena y muestra archivo en ventana modal al escoger archivo en ventana de administracion de archivos
  public onFileChangeP(event): void {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      // tslint:disable-next-line: variable-name
      this.list_archivos = event.target.files;
      if (this.list_archivos.length === 1) {
        if (file.type.includes('image') || file.type.includes('video')) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          // tslint:disable-next-line: typedef
          reader.onload = function load() {
            this.abrirModal('pModal');
            this.image = reader.result;
          }.bind(this);
          this.file = file;
          this.verificarTipo(file);
        } else {
          console.log('ha ocurrido un error');
        }
      } else {
        this.guardarArchivos(this.list_archivos);
      }
    }
  }
  // tslint:disable-next-line: variable-name
  guardarArchivos(list_archivos): void {
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < list_archivos.length; index++) {
      this.obtenerImagen(list_archivos[index]);
    }
    this.verificarTipo(list_archivos[0]);
    this.abrirModal('publicarMultipleModal');
  }
  obtenerImagen(archivo: File): any {
    const reader = new FileReader();
    reader.readAsDataURL(archivo);
    // tslint:disable-next-line: typedef
    reader.onload = function load() {
      this.archivos.push(reader.result);
    }.bind(this);
  }
  // devuelve en variable tipoArchivo si el archivo es imagen o video
  verificarTipo(file: any): void {
    if (file.type.includes('image')) {
      this.tipoArchivo = 'imagen';
    } else if (file.type.includes('video')) {
      this.tipoArchivo = 'video';
    }
  }
  adelante(): void {
    this.verificarTipo(this.list_archivos[this.contador]);
    if (this.contador < (this.archivos.length - 1)) {
      this.contador = this.contador + 1;
    } else {
      this.contador = 0;
    }
  }
  atras(): void {
    this.verificarTipo(this.list_archivos[this.contador]);
    if (this.contador > 0) {
      this.contador = this.contador - 1;
    }
  }
  // Abre ventana Modal
  // tslint:disable-next-line: variable-name
  public abrirModal(nombre_modal: string): void {
    const modal = document.getElementById('pModal');
    const body = document.getElementsByTagName('body')[0];
    modal.style.display = 'block';
    body.style.position = 'static';
    body.style.height = '100%';
    body.style.overflow = 'hidden';
  }
  // Cierra ventana modal
  // tslint:disable-next-line: variable-name
  public cerrarModal(nombre_modal: string): void {
    const modal = document.getElementById(nombre_modal);
    const body = document.getElementsByTagName('body')[0];
    modal.style.display = 'none';

    body.style.position = 'inherit';
    body.style.height = 'auto';
    body.style.overflow = 'visible';
  }
  // Realiza publicacion
  public publicar(): void {
    this.publicacion.id_usuario = this.usuario.id_usuario;
    this.guardarPublicacion(this.publicacion);
    if (this.list_archivos.length == 1) {
      this.multimedia.contenido_mult = this.file;
      if (this.file.type.includes('image')) {
        this.multimedia.id_type = 1;
      } else if (this.file.type.includes('video')) {
        this.multimedia.id_type = 2;
      }
      // tslint:disable-next-line: variable-name
      // tslint:disable-next-line: radix
      const id_pub = parseInt(localStorage.getItem('id_pub'));
      // tslint:disable-next-line: radix
      this.guardarMultimedia(this.multimedia, id_pub, this.file);
      this.cerrarModal('pModal');
    } else {
      const id_pub = parseInt(localStorage.getItem('id_pub'));
      // tslint:disable-next-line: prefer-for-of
      for (let index = 0; index < this.list_archivos.length; index++) {
        this.multimedia.contenido_mult = this.list_archivos[index];
        if (this.list_archivos[index].type.includes('image')) {
          this.multimedia.id_type = 1;
        } else if (this.list_archivos[index].type.includes('video')) {
          this.multimedia.id_type = 2;
        }
        this.guardarMultimedia(this.multimedia, id_pub, this.list_archivos[index]);
      }
      this.cerrarModal('publicarMultipleModal');
      // tslint:disable-next-line: prefer-for-of

    }
  }
  // tslint:disable-next-line: variable-name
  guardarMultimedia(multimedia: Multimedia, id_pub: number, file: File): void {
    this.multimedia.id_pub = id_pub;
    this.multimediaService.publicar_imagen(multimedia, file).subscribe(
      (res: any) => {
        this.webService.emit(this.event_name, res);
      },
      err => { }
    );
  }
  guardarPublicacion(publicacion: Publicacion): void {
    this.publicacionService.publicar(this.publicacion).subscribe(
      (res: any) => {
        let notificacion: Notificacion = {
          id_notif: 0,
          contenido_notif: "El usuario " + this.usuario.nom_usuario + " ha realizado una publicacion",
          fecha_hora_notif: new Date(),
          leida_notif:false,
          id_usuario: this.usuario.id_usuario,
        };
        this.guardarnotificacion(notificacion);
        localStorage.setItem('id_pub', res);
        this.cerrarModal('pModal');
      },
      err => { }
    );
  }
  cambiarPestana(pestana: any): void {
    this.tabAct = pestana;
  }
  // Detecta si el dispositivo es un celular
  public detectarMovil(): void {
    if (navigator.userAgent.match(/Android/i)
      || (navigator.userAgent.match(/webOS/i))
      || (navigator.userAgent.match(/iPhone/i))
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)) {
      this.esMovil = true;
    }
  }
  valueBrillo(): void {
    const slider = document.getElementById('brillo') as HTMLInputElement;
    Caman('#image-id', function (): void {
      this.brillo = slider.value;
      this.revert();
      this.brightness(this.brillo).render();
    });
  }
  valueContrastre(): void {
    const slider = document.getElementById('contrastre') as HTMLInputElement;
    // tslint:disable-next-line: radix
    this.contraste = Number.parseInt(slider.value);
    Caman('#image-id', function (): void {
      this.revert();
      this.contrast(this.contraste).render();
    });
  }
  valueSaturacion(): void {
    const slider = document.getElementById('saturacion') as HTMLInputElement;
    // tslint:disable-next-line: radix
    this.saturacion = Number.parseInt(slider.value);
    Caman('#image-id', function (): void {
      this.revert();
      this.saturation(this.saturacion).render();
    });
  }

  // tslint:disable-next-line: variable-name
  aplicarFiltro(id_filtro: number): void {
    this.multimedia.id_filtro = id_filtro;
    switch (id_filtro) {
      // clasico
      case 1:
        Caman('#image-id', function(): void {
          this.revert();
          this.vintage().render();
        });
        break;
      // nostalgia
      case 2:
        Caman('#image-id', function (): void {
          this.revert();
          this.nostalgia().render();
        });
        break;
      // claridad
      case 3:
        Caman('#image-id', function (): void {
          this.revert();
          this.clarity().render();
        });
        break;
      // majestusa
      case 4:
        Caman('#image-id', function (): void {
          this.revert();
          this.herMajesty().render();
        });
        break;
      // amor
      case 5:
        Caman('#image-id', function (): void {
          this.revert();
          this.love().render();
        });
        break;
      // otoño
      case 6:
        Caman('#image-id', function (): void {
          this.revert();
          this.orangePeel().render();
        });
        break;
      // Consentrado
      case 7:
        Caman('#image-id', function (): void {
          this.revert();
          this.concentrate().render();
        });
        break;
      // Nublado
      case 8:
        Caman('#image-id', function (): void {
          this.revert();
          this.hazyDays().render();
        });
        break;
      // Amanecer
      case 9:
        Caman('#image-id', function (): void {
          this.revert();
          this.sunrise().render();
        });
        break;
      // Soleado
      case 10:
        Caman('#image-id', function (): void {
          this.revert();
          this.glowingSun().render();
        });
        break;
      // Sucio
      case 11:
        Caman('#image-id', function (): void {
          this.revert();
          this.grungy().render();
        });
        break;
      case 12:
        this.nuevoEfecto('#85C1E9', 'overlay');
        break;
      case 13:
        this.nuevoEfecto('#FF5733', 'difference');
        break;
      case 14:
        this.nuevoEfecto('#33FCFF', 'darken');
        break;
      case 15:
        this.nuevoEfecto('#ECFF33', 'overlay');
        break;
      case 16:
        this.nuevoEfecto('#F41AA2', 'multiply');
        break;
      case 17:
        this.nuevoEfecto('#731AF4', 'lighten');
        break;
      case 18:
        this.nuevoEfecto('#1AF434', 'screen');
        break;
      case 19:
        this.nuevoEfecto('#28612F', 'addition');
        break;
      case 20:
        this.nuevoEfecto('#E91438', 'exclusion');
        break;
      case 21:
        this.nuevoEfecto('#5a1d4a', 'overlay');
        break;
      case 22:
        this.nuevoEfecto('#a59a13', 'softLight');
        break;
      case 23:
        this.nuevoEfecto('#b4b4b2', 'overlay');
        break;
      case 24:
        this.nuevoEfecto('#280cf2', 'lighten');
        break;
      case 25:
        this.nuevoEfecto('#61e552', 'difference');
        break;
      case 26:
        this.nuevoEfecto('#66f0dd', 'multiply');
        break;
      case 27:
        this.nuevoEfecto('#ff0536', 'darken');
        break;
      case 28:
        this.nuevoEfecto('#ff7400', 'difference');
        break;
      case 29:
        this.nuevoEfecto('#a19441', 'overlay');
        break;
      case 30:
        this.nuevoEfecto('#488aa2', 'softLight');
        break;
      case 31:
        this.nuevoEfecto('#e7aaf8', 'multiply');
        break;
      case 32:
        this.nuevoEfecto('#f67397', 'screen');
        break;
      case 33:
        this.nuevoEfecto('#5fe9e9', 'darken');
        break;
      case 34:
        this.nuevoEfecto('#ed2fa8', 'multiply');
        break;
      case 35:
        this.nuevoEfecto('#334d75', 'overlay');
        break;
      case 36:
        this.nuevoEfecto('#1f218a', 'screen');
        break;
      case 37:
        this.nuevoEfecto('#85C1E9', 'overlay');
        break;
      case 38:
        this.nuevoEfecto('#85C1E9', 'overlay');
        break;
      case 39:
        this.nuevoEfecto('#85C1E9', 'overlay');
        break;
      case 40:
        this.nuevoEfecto('#85C1E9', 'overlay');
        break;
      case 41:
        this.nuevoEfecto('#85C1E9', 'overlay');
        break;
      case 42:
        this.nuevoEfecto('#85C1E9', 'overlay');
        break;
      case 43:
        this.nuevoEfecto('#85C1E9', 'overlay');
        break;
      case 44:
        this.nuevoEfecto('#85C1E9', 'overlay');
        break;
      case 45:
        this.nuevoEfecto('#85C1E9', 'overlay');
        break;
      case 46:
        this.nuevoEfecto('#85C1E9', 'overlay');
        break;
      case 47:
        this.nuevoEfecto('#85C1E9', 'overlay');
        break;
      case 48:
        this.nuevoEfecto('#85C1E9', 'overlay');
        break;
      case 49:
        this.nuevoEfecto('#85C1E9', 'overlay');
        break;
      case 50:
        this.nuevoEfecto('#85C1E9', 'overlay');
        break;
      case 51:
        this.nuevoEfecto('#85C1E9', 'overlay');
        break;
      case 52:
        this.nuevoEfecto('#85C1E9', 'overlay');
        break;
      default:
        break;
    }
  }
  nuevoEfecto(hexColor: string, efecto: string): void {
    Caman('#image-id', function (): void {
      this.revert(false);
      this.newLayer(function (): void {
        this.fillColor(hexColor);
        this.setBlendingMode(efecto);
      });
      this.render();
    });
  }
  public ingresar(){
    let ruta= '/home/perfil/' + this.usuario.nom_usuario;
    this.router.navigate([ruta]);
  }
}

