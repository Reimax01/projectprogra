import { Usuario } from '@models/Usuario';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@services/common/user.service';

@Component({
  selector: 'app-informacion-personal',
  templateUrl: './informacion-personal.component.html',
  styleUrls: ['./informacion-personal.component.css']
})
export class InformacionPersonalComponent implements OnInit {
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
    nombre_genero: ''};
  generos: any;
  constructor(private usuarioService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getGeneros();
    this.getUsuario();
  }
  // Obtiene usuario de sesion actual
  // tslint:disable-next-line: typedef
  getUsuario() {
    this.usuarioService.getUser().subscribe(
      (res: any) => {
        this.almacenarUsuario(res[0]);
        console.log(res[0]);
      }, err => { }
    );
  }
  // almacena usuario determinado por variable usuario desde bd
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
  // convierte fecha en formato soportado por html5
  formato(fecha_nac_usuario: string): string {
   const fecha = fecha_nac_usuario.slice(0, -14);
   const dia = fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3');
   const mes = fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$2');
   const anio = fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$1');
   return anio + '-' + mes + '-' + dia;
  }
  // Obtiene generos desde bd
   // tslint:disable-next-line: typedef
   public getGeneros(){
    this.usuarioService.getGeneros().subscribe(
      (res: any) => {
        console.log(res);
        this.generos = res;
      }, err => {}
    );
  }
  // realiza actualizacion de usuario
  // tslint:disable-next-line: typedef
  public actualizarUsuario(){
    let new_Usuario:Usuario ={
      id_usuario: this.usuario.id_usuario,
      nombres_user: this.usuario.nombres_user,
      apellidos_user: this.usuario.apellidos_user,
      nom_usuario: this.usuario.nom_usuario,
      email_user: this.usuario.email_user,
      celular_user: this.usuario.celular_user,
      fecha_nac: new Date(this.usuario.fecha_nac),
      contrasena_usuario: '' ,
      presentacion: this.usuario.presentacion,
      telefono: this.usuario.telefono,
      id_genero: this.usuario.id_genero,
    };
    this.usuarioService.updateUser(this.usuario.id_usuario, new_Usuario).subscribe((res: any) => {
        alert(res);
    });
  }
}
