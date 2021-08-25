import {UserService} from '@services/common/user.service';
import {Component, OnInit} from '@angular/core';
import {AmistadesService} from '@services/amistades.service';
import {NsMessageService} from '@services/common/ns.message.service';

@Component({
  selector: 'app-lista-amigos',
  templateUrl: './list-friends.component.html',
  styleUrls: ['./list-friends.component.css']
})
export class ListFriendsComponent implements OnInit {
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
  amigos: any;

  constructor(
    private usuarioService: UserService,
    private amigosService: AmistadesService,
    private nsMessageService: NsMessageService
  ) { }

  ngOnInit(): void {
    this.getUsuario();
  }

  // tslint:disable-next-line: variable-name
  getAmigos(id_usuario: number): void {
    this.amigosService.getAmigos(id_usuario).subscribe(
      (res: any) => {
        this.amigos = res;
      }
    );
  }

  verificarSegidor(amigo: any): string {
    // tslint:disable-next-line: triple-equals
    if (amigo == true) {
      return 'Seguir';
    } else {
      return 'Dejar de Seguir';
    }
  }

  verificarBloqueo(amigo: any): string {
    // tslint:disable-next-line: triple-equals
    if (amigo == true) {
      return 'Debloquear';
    } else {
      return 'Bloquear';
    }
  }

  // tslint:disable-next-line: variable-name
  eliminarAmigo(id_amigo: number): void {
    this.amigosService.deleteAmigo(this.usuario.id_usuario, id_amigo).subscribe(
      (res: any) => {
        this.nsMessageService.success('Usuario eliminado');
      }
    );
  }

  // tslint:disable-next-line: variable-name
  bloquearAmigo(id_amigo: any): void {
    // tslint:disable-next-line: triple-equals
    const bloqueado = this.amigos.filter(amigo => amigo.id_amigo == id_amigo)[0].es_bloqueado;
    if (bloqueado) {
      this.desbloquearAmigo(id_amigo);
    } else {
      this.realizar_bloqueo(id_amigo);
    }
  }

  // tslint:disable-next-line: variable-name
  realizar_bloqueo(id_amigo: any): void {
    this.amigosService.bloquearAmigo(this.usuario.id_usuario, id_amigo).subscribe(
      (res: any) => {
        this.nsMessageService.info('Usuario Bloqueado');
        this.getAmigos(this.usuario.id_usuario);
      }
    );
  }

  // tslint:disable-next-line: variable-name
  desbloquearAmigo(id_amigo: any): void {
    this.amigosService.desbloquearAmigo(this.usuario.id_usuario, id_amigo).subscribe(
      (res: any) => {
        this.nsMessageService.info('Usuario Desbloqueado');
        this.getAmigos(this.usuario.id_usuario);
      }
    );
  }

  // tslint:disable-next-line: typedef
  // tslint:disable-next-line: variable-name
  seguirAmigo(id_amigo: number): void {
    // tslint:disable-next-line: triple-equals
    const bloqueado = this.amigos.filter(amigo => amigo.id_amigo == id_amigo)[0].es_seguido;
    if (bloqueado) {
      this.dejar_seguir_amigo(id_amigo);
    } else {
      this.realizar_seguida_amigo(id_amigo);
    }
  }

  realizar_seguida_amigo(id_amigo: number) {
    this.amigosService.seguirAmigo(this.usuario.id_usuario, id_amigo).subscribe(
      (res: any) => {
        this.nsMessageService.success('Has seguido a un amigo');
        this.getAmigos(this.usuario.id_usuario);
      }
    );
  }

  dejar_seguir_amigo(id_amigo: number) {
    this.amigosService.dejarseguirAmigo(this.usuario.id_usuario, id_amigo).subscribe(
      (res: any) => {
        this.nsMessageService.success('Has dejado de seguir a un amigo');
        this.getAmigos(this.usuario.id_usuario);
      }
    );
  }

  // Obtiene usuario de sesion actual
  // tslint:disable-next-line: typedef
  getUsuario() {
    this.usuarioService.getUser().subscribe(
      (res: any) => {
        this.getAmigos(res[0].id_usuario);
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
    this.usuario.genero = usuario.genero;
  }

  // Almacena datos de usuarios en objeto usuario desde la bd

}
