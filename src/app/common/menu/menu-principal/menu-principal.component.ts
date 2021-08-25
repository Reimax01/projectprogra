import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AmistadesService} from '@services/amistades.service';
import {UserService} from '@services/common/user.service';
import {WebSocketService} from '@services/web-socket.service';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent implements OnInit {
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
  solicitudes: any;
  cantSolicitudes = 0;
  usuarioBuscar: string = '';

  constructor(private userService: UserService,
              private router: Router,
              private amigosService: AmistadesService,
              private webService: WebSocketService) {
  }

  ngOnInit(): void {
    this.getUsuario();
    this.webService.listen('recibir-aceptacion').subscribe((data: any) => {
      const id_activo = parseInt(localStorage.getItem('usuario_activo'));
      this.getSolicitudesAmistad(id_activo);
    });
    this.webService.listen('recibir-solicitud').subscribe((data: any) => {
      const id_activo = parseInt(localStorage.getItem('usuario_activo'));
      this.getSolicitudesAmistad(id_activo);
    });
  }

  // tslint:disable-next-line: typedef
  getUsuario() {
    this.userService.getUser().subscribe(
      (res: any) => {
        this.almacenarUsuario(res[0]);
        this.getSolicitudesAmistad(res[0].id_usuario);
        localStorage.setItem('usuario_activo', res[0].id_usuario);
      }, err => {
      }
    );
  }

// tslint:disable-next-line: typedef
  almacenarUsuario(usuario: any) {
    this.usuario.nombres_user = usuario.nombres_usuario;
    this.usuario.apellidos_user = usuario.apellidos_usuario;
    this.usuario.nom_usuario = usuario.nom_usuario;
    this.usuario.imagen_usuario = usuario.imagen_usuario;
    this.usuario.presentacion = usuario.presentacion_usuario;
    this.usuario.email_user = usuario.email_usuario;
    this.usuario.fecha_nac = this.format(usuario.fecha_nac_usuario);
    this.usuario.genero = usuario.genero;
  }

  getSolicitudesAmistad(id_usuario: number) {
    this.amigosService.getsoliicitudesAmistad(id_usuario).subscribe(
      (res: any) => {
        if (res) {
          this.solicitudes = res;
          this.cantSolicitudes = res.length;
          if (this.solicitudes instanceof Array) {
            this.solicitudes = this.solicitudes.filter(item => +item.id_amigo !== id_usuario);
            this.cantSolicitudes = this.solicitudes.length;
          }
        }
      }
    );
  }

  confirmFriend(id_usuario: number, id_amigo: number): void {
    this.amigosService.aceptarAmigo(id_usuario, id_amigo).subscribe(
      (res: any) => {
        this.webService.emit('aceptar-solicitud', res);
      }
    );
  }

  searchUser() {
    console.log(this.usuarioBuscar);
    if (this.usuarioBuscar) {
      let ruta = '/home/usuarios/' + this.usuarioBuscar;
      this.router.navigate([ruta]);
    }
  }

  format(birthDateUser: string): string {
    const date = birthDateUser.slice(0, -14);
    const day = date.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3');
    const month = date.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$2');
    const year = date.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$1');
    return year + '-' + month + '-' + day;
  }

  public logout() {
    this.userService.logout().subscribe(
      (res: any) => {
        localStorage.removeItem('token');
        this.router.navigate(['/']);
      }, err => {
      }
    );
  }

  logUsua($event) {
    console.log($event);
    console.log(this.usuarioBuscar);
  }
}
