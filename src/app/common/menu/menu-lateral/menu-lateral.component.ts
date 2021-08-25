import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '@services/common/user.service';
import {Usuario} from '@models/Usuario';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit {
  usuario: Usuario = {
    id_usuario: 0,
    nom_usuario : '',
    nombres_user: '',
    apellidos_user: '',
    email_user: '',
    celular_user: '',
    fecha_nac: new Date(),
    contrasena_usuario: '',
    presentacion: '',
    telefono: '',
    id_genero : 0
  };

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.getUsuario();
  }

  // tslint:disable-next-line: typedef
  getUsuario() {
    this.userService.getUser().subscribe(
      (res: any) => {
        this.almacenarUsuario(res[0]);
      }, err => {
      }
    );
  }

// tslint:disable-next-line: typedef
  almacenarUsuario(usuario: any) {
    this.usuario = usuario;
    /*this.usuario.nombres_user = usuario.nombres_usuario;
    this.usuario.apellidos_user = usuario.apellidos_usuario;
    this.usuario.nom_usu = usuario.nom_usuario;
    this.usuario.presentacion = usuario.presentacion_usuario;
    this.usuario.email_user = usuario.email;
    this.usuario.genero = usuario.genero;*/
  }

  ingresarPerfil() {
    let ruta = '/home/perfil/' + this.usuario.nom_usuario;
    this.router.navigate([ruta]);
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

}
