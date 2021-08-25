import { Usuario } from '@models/Usuario';
import { Component, OnInit } from '@angular/core';
import { UserService } from '@services/common/user.service';

@Component({
  selector: 'app-cambio-contrasena',
  templateUrl: './cambio-contrasena.component.html',
  styleUrls: ['./cambio-contrasena.component.css']
})
export class CambioContrasenaComponent implements OnInit {
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
  newPassword = {
    contrasena_usuario: '',
    confirm_contrasena_usuario: ''
  };
  contraseniaAct: string;
  constructor(private usuarioService: UserService) { }

  ngOnInit(): void {
    this.getUsuario();
  }
  // obtiene usuario de sesion actula
  getUsuario() {
    this.usuarioService.getUser().subscribe(
      (res: any) => {
        this.almacenarUsuario(res[0]);
        console.log(res[0]);
      }, err => { }
    );
  }
  // Almacena usuario recibido de bd en objeto usuario
  // tslint:disable-next-line: typedef
  almacenarUsuario(usuario: any) {
    this.usuario.id_usuario = usuario.id_usuario;
    this.usuario.nombres_user = usuario.nombres_usuario;
    this.usuario.apellidos_user = usuario.apellidos_usuario;
    this.usuario.nom_usuario = usuario.nom_usuario;
    this.usuario.imagen_usuario = usuario.imagen_usuario;
    this.usuario.presentacion = usuario.presentacion_usuario;
    this.usuario.telefono = usuario.telefono_usuario;
    this.usuario.email_user = usuario.email_usuario;
    this.usuario.fecha_nac = this.formato(usuario.fecha_nac_usuario);
    this.usuario.id_genero = usuario.id_genero;
    this.usuario.nombre_genero = usuario.nombre_genero;
  }
  // convierte fecha eb formato soportado por html5
  // tslint:disable-next-line: variable-name
  formato(fecha_nac_usuario: string): string {
    const fecha = fecha_nac_usuario.slice(0, -14);
    const dia = fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3');
    const mes = fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$2');
    const anio = fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$1');
    return anio + '-' + mes + '-' + dia;
  }
  // realiza cambio de contraseña
  // tslint:disable-next-line: typedef
  public guardarCambios() {
    const newContrasena: Usuario = {
      id_usuario: 0,
      nombres_user: '',
      apellidos_user: '',
      nom_usuario: '',
      email_user: '',
      celular_user: '',
      fecha_nac: new Date(),
      contrasena_usuario: this.newPassword.contrasena_usuario,
      presentacion: '',
      telefono: '',
      id_genero: 0
    };
    const contraseniaAC: Usuario = {
      id_usuario: 0,
      nombres_user: '',
      apellidos_user: '',
      nom_usuario: '',
      email_user: '',
      celular_user: '',
      fecha_nac: new Date(),
      contrasena_usuario: this.contraseniaAct,
      presentacion: '',
      telefono: '',
      id_genero: 0
    };
    // tslint:disable-next-line: triple-equals
    if (this.newPassword.contrasena_usuario == this.newPassword.confirm_contrasena_usuario) {
      this.usuarioService.confirmContrasena(this.usuario.id_usuario, contraseniaAC).subscribe(
        (res: any) => {
          this.guardarContrasenia(newContrasena);
        }
      );
    } else {
      alert('No coinciden contraseñas');
    }
  }
  // actualiza contraseña de usuario de sesion actual
  // tslint:disable-next-line: typedef
  guardarContrasenia(usuario: Usuario) {
    this.usuarioService.updatePassword(this.usuario.id_usuario, usuario).subscribe(
      (res: any) => {
        alert(res);
      }
    );
  }

}
